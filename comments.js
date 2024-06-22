// create web server
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

let comments = [];

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  comments.push(req.body);
  fs.writeFileSync('comments.json', JSON.stringify(comments));

  res.status(201).json(req.body);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
});