const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  console.log(events);

  // posts
  axios.post('http://posts-clusterip-srv:4000/events', event).catch((err) => {
    console.log(err);
  });
  // comments
  axios.post('http://localhost:4001/events', event).catch((err) => {
    console.log(err);
  });
  // query
  axios.post('http://localhost:4002/events', event).catch((err) => {
    console.log(err);
  });
  // moderation
  axios.post('http://localhost:4003/events', event).catch((err) => {
    console.log(err);
  });

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening on 4005', 'event bus');
});
