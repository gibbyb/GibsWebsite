const express = require('express');
const path = require('path');
const app = express();
const port = 8081;
const connectToDb = require('./db.js');

app.use(express.static(path.join(__dirname, 'client/build'))); // Serve static files from the "public" directory

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // Serve the index.html file on the root path
});

// Test database connection
connectToDb()
  .then((db) => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.stack);
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

