const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

const PORT = 3000;

app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../client/popup.html'));
});

app.get('/client/index.js', (req,res) => {
  return res.sendFile(path.resolve(__dirname, '../client/index.js'))
})

app.get('/style.css', (req, res) => {
  return res.status(200).set('Content-Type', 'text/css').sendFile(path.resolve(__dirname, '../client/style.css'))
})

io.on('connection', (socket) => {
  console.log('a user has connected');
  socket.on('click', (msg) => {
    console.log('message:' + msg);
    io.emit('click', msg);
  })
  socket.on('disconnect', () => {
    console.log('a user has disconnected');
  })
});

http.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
});