const express = require('express');
const path = require('path');
const app = express();
const port = 8081;

app.use(express.static(path.join(__dirname, 'client/public'))); // Serve static files from the "public" directory

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // Serve the index.html file on the root path
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
