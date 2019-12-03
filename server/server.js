const express = require('express');
const app = express();
const http = require('http').createServer(app);

const PORT = 3000;

app.get('/', (req, res) => {
  return res.send('connected');
});

http.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
});