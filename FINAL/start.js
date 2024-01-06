const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mysql = require('mysql');
const fs = require('fs');
const cors = require('cors');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3000;
const manager_endpoint = "/oop/FINAL/manager.php"


const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: '*' } });

app.use(cookieParser());
app.use(session({
  secret: "s3cr3t",
  saveUninitialized: true,
  resave: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));
app.use(express.static('assets'));
app.set('view engine', 'ejs');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "oop"
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});


io.on('connection', (socket) => {

  connection.query('SELECT id, file_path FROM uploads', (err, results) => {
    if (err) {
      console.error('Error fetching video list:', err);
      return;
    }

    const videoIDList = results.map((row) => row.id);
    const videoPathList = results.map((row) => row.file_path);
    let currentVideoIndex = 0;

    // Check if the video file exists
    if (!fs.existsSync(videoPathList[currentVideoIndex])) {
      socket.emit('video-not-available');
      return;
    }

    function sendNextVideo() {
      if (currentVideoIndex < videoIDList.length) {
        const nextVideoURL = `http://localhost:3000/video/${videoIDList[currentVideoIndex]}`;
        socket.emit('videoFile', { url: nextVideoURL });
        currentVideoIndex++;
      } else {
        // If all videos played, send a signal or handle as per your requirement
        socket.emit('allVideosPlayed');
      }
    }

    function deleteVideo(id){
      const index = videoIDList.indexOf(id);
      console.log(`Trying to unlink ${videoPathList[index]}`);

      fs.close(videoPathList[index], (err)=>{
        if (err) console.log(err);

        console.log(`${videoPathList[index]} was deleted`);
        const removedID = videoIDList.splice(index, 1); 
        const removedVideo = videoPathList.splice(index, 1); 
        console.log(`Removed from video id list: ${removedID}`);
        console.log(`Removed from video video list: ${removedVideo}`);


      })

      // if (videoPathList[index]) {
      //   fs.chmod(videoPathList[index], '0777', () => {
      //     fs.unlink(videoPathList[index], (err) => {
      //       if (err) console.log(err);

      //     }); 
      //   })
      // }
    }


    socket.on('requestVideo', () => {
      // console.log(currentVideoIndex);
      sendNextVideo();
    });

    socket.on('videoEnded', () => {
      console.log('All video playlist ended.');
      sendNextVideo();
    });

    socket.on('disconnect', () => {
      console.log('A client disconnected');
    });

    socket.on('video-removed', (id) => {
      deleteVideo(id);
    });
  });
});

// INDEX
app.get('/', (req, res) => {
  if (req.session.uid) {
    if (req.session.role === "admin") {
      res.redirect('/admin');
    } else {
      res.redirect(`http://${req.hostname}${manager_endpoint}`);
    }
  } else {
    res.render('index');
  }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if user exists and credentials match
    const query = "SELECT * FROM users WHERE username=? AND password=?";
    connection.query(query,[username, password], (err, results) => {

      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send({ success: false, message: 'Error executing query.' });
      }
  
      if (results.length > 0) {
        const row = results[0];

        req.session.authenticated = true;
        req.session.role = row.usertype;
        req.session.uid = row.id;

        if (row.usertype === 'user') {
            return res.send({
               success: true, 
               message: 'Login successful', 
               endpoint: `http://${req.hostname}${manager_endpoint}?uid=${req.session.uid}`
            });
        } else {
            return res.send({ 
              success: true, 
              message: 'Login successful', 
              endpoint: `http://${req.hostname}:${PORT}/admin`
            });
        }
      } else {
        return res.status(401).send({ success: false, message: 'Incorrect username or password.' });
      }

  });
});

app.get('/logout', (req, res) => {
  console.log(`Current Role: ${req.session.role}`);
  req.session.destroy();
  console.log('Session destroyed.')
  res.redirect("/");
});

app.get('/video/:id', (req, res) => {

  const videoID = req.params.id;

  const query = `SELECT * FROM uploads where id = ?`;
  
  connection.query(query, [videoID], (err, results) => {
    if (err) {
      console.error('Error fetching video', err);
      return res.status(500).send({ success: false, message: 'Error executing query.' });
    }

    if (results.length === 0) {
      res.status(404).send('Video not found');
      return;
    }
    const videoPath = results[0].file_path;
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
  
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
  
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      var readStream = fs.createReadStream(videoPath).pipe(res);
    }
  });
});

// ADMIN
app.get('/admin', (req, res) => {
  if (req.session.uid) {

    if (req.session.role === 'admin') {
      const query = `SELECT * FROM users`;
  
      connection.query(query, (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).send({ success: false, message: 'Error executing query.' });
        }

        res.render('admin', {data: results});
      
      });

    } else {
      res.redirect(`http://${req.hostname}${manager_endpoint}`)

    }   

  } else {
    res.redirect('/');
  }

  
});


// USERS
app.post('/add_user' , (req, res) => {
  const {firstName, lastName, userType, username, password} = req.body
  const query = `INSERT INTO users (fname, lname, username, password, usertype) VALUES (?, ?, ?, ?, ?)`;
  
  connection.query(query, [firstName, lastName, username, password, userType], (err, results) => {
    if (err) {
      console.log(err)
      
    }

    res.redirect('/admin');
  });
});

app.get('/user/:id', (req, res) => {
  const query = "SELECT * FROM users where id=?";
  
  connection.query(query,[req.params.id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send({ success: false, message: 'Error executing query.' });
    }

    res.json(results[0])
  
  });
});

app.post('/edit_user' , (req, res) => {

  const {firstName, lastName, userType, username, password, userid} = req.body
  const query = `UPDATE users SET fname = ?, lname = ?, username = ?, usertype = ?  WHERE id = ?;`;
  
  connection.query(query, [firstName, lastName, username, userType, userid], (err, results) => {
    if (err) {
      console.log(err)
      
    }

    res.redirect('/admin');
  });
});

app.post('/delete_user' , (req, res) => {

  const {userid} = req.body
  const query = "DELETE from users where id=?";
  
  connection.query(query, [userid], (err, results) => {
    if (err) {
      console.log(err)
    }

    res.redirect('/admin');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});