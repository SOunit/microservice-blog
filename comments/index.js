const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: 'pending' });

  commentsByPostId[req.params.id] = comments;

  axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: comments,
      content,
      postId: req.params.id,
      status: 'pending',
    },
  });

  res.status(201).send(comments);
});

app.post('/events', (req, res) => {
  console.log('Event Received:', req.body.type);

  res.send({});
});

app.listen(4001, () => {
  console.log('Listen on 4001');
});
