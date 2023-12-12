const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'users',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('/index.php');
})

app.post('/', (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM acc WHERE username=? AND password=?";
  connection.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Error executing query');
    }

    if (results.length > 0) {
      const user = results[0];
      req.session.username = user.username;
      req.session.user_id = user.id;

      if (user.usertype === 'user') {
        return res.redirect('/manager.php');
      } else if (user.usertype === 'admin') {
        return res.redirect('/admin.php');
      }
    }

    return res.status(401).send('Incorrect username or password');
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
