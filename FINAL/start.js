const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: true }));


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "users"
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

app.get('/', (req, res) => {
  res.render('index')
});

app.get('/admin', (req, res) => {

  const query = `SELECT * FROM acc`;
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send({ success: false, message: 'Error executing query.' });
    }

    res.render('admin', {data: results})
  
  });
});

app.get('/logout', (req, res) => {
  res.redirect("/");
});

// USERS
app.post('/add_user' , (req, res) => {
  const {firstName, lastName, userType, username, password} = req.body
  const query = `INSERT INTO acc (fname, lname, username, password, usertype) VALUES (?, ?, ?, ?, ?)`;
  
  connection.query(query, [firstName, lastName, username, password, userType], (err, results) => {
    if (err) {
      console.log(err)
      
    }

    res.redirect('/admin');
  });
});

app.get('/user/:id', (req, res) => {
  const query = `SELECT * FROM acc where id=`+req.params.id;
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send({ success: false, message: 'Error executing query.' });
    }

    res.json(results[0])
  
  });
});

app.post('/edit_user' , (req, res) => {

  const {firstName, lastName, userType, username, password, userid} = req.body
  const query = `UPDATE acc SET fname = ?, lname = ?, username = ?, password = ?, usertype = ?  WHERE id = ?;`;
  
  connection.query(query, [firstName, lastName, username, password, userType, userid], (err, results) => {
    if (err) {
      console.log(err)
      
    }

    res.redirect('/admin');
  });
});

app.post('/delete_user' , (req, res) => {

  const {userid} = req.body
  const query = `DELETE from acc where id=?`;
  
  connection.query(query, [userid], (err, results) => {
    if (err) {
      console.log(err)
    }

    res.redirect('/admin');
  });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    const query = `SELECT * FROM acc WHERE username='${username}' AND password='${password}'`;
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send({ success: false, message: 'Error executing query.' });
      }
  
      if (results.length > 0) {
        const row = results[0];
        if (row && row.usertype) {
          if (row.usertype === 'admin') {
            res.redirect('/admin');
            // return res.send({ success: true, message: 'Login successful', usertype: row.usertype });
          } else if (row.usertype === 'user') {
            res.redirect(`http://${req.hostname}/webtech/FINAL/manager.php`)
          } else {
            return res.status(401).send({ success: false, message: 'Unexpected user type.' });
          }
        } else {
          return res.status(401).send({ success: false, message: 'Incorrect username or password.' });
        }
      } else {
        return res.status(401).send({ success: false, message: 'Incorrect username or password.' });
      }
    });
  });

  app.get('/gotologs', (req, res) => {
        res.json({ success: true, usertype: 'admin' }); 
        res.json({ success: false, usertype: 'user' });
    
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
