// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const comments = commentsByPostId[id] || [];
  res.status(200).send(comments);
});

app.post('/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const commentId = randomBytes(4).toString('hex');
  const comments = commentsByPostId[id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[id] = comments;
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log('Listening on port 4001');
});