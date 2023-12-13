const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
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
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
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
          if (row.usertype === 'user' || row.usertype === 'admin') {
            return res.send({ success: true, message: 'Login successful', usertype: row.usertype });
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
