const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = 8001; 

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(express.static(__dirname));

app.post('/execute-php', (req, res) => {
  exec('php -f index.php', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      return res.status(500).send('Internal Server Error');
    }
    res.send(stdout);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
