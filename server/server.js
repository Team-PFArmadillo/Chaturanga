const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const mongoose = require('mongoose');

const PORT = 3000;

// * establish body-parser and use it to be able to access data in a readable format
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// * creating a connection string to speak with database

mongoose.connect('mongodb+srv://rella_db_chat:iFtMZb9.znUo!uxBTMqt@cluster0-zqzvp.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(
    () => {
      console.log('Database is connected!');
    },
  )

// * create an error handler in the event database cannot connect
  .catch((err) => {
    console.log(`Cannot access database${err}`);
  });


// * creating a new instance of the Schema

const { Schema } = mongoose;
const messageThread = new Schema({
  messages: Array,
});


const MessageThread = mongoose.model('Chat Logs', messageThread);


app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../client/popup.html'));
});

app.get('/client/index.js', (req,res) => {
  return res.sendFile(path.resolve(__dirname, '../client/index.js'))
})

app.get('/style.css', (req, res) => {
  return res.status(200).set('Content-Type', 'text/css').sendFile(path.resolve(__dirname, '../client/style.css'))
})

// * creating and saving message to the database

app.post('/addmessage', (req, res) => {
  // console.log(req.body);
  const myData = MessageThread.create({ messages: [req.body] }, (err, msgData) => {
    if (err) return console.log('Whoopsies! Issue with querying data.');
    console.log(msgData);
    res.send(msgData);
  });
});

app.get('/getmessage', (req, res) => {
  MessageThread.find({}, (err, msgData) => {
    if (err) return console.log('Whoopsies! Issue with querying data.');
    res.send(msgData);
  });
});

io.on('connection', (socket) => {
  console.log('a user has connected');
  socket.on('click', (msgData) => {
    console.log('message:' + msgData);
    io.emit('click', msgData);

    //send new msg to database for persistence between sessions
    const myData = MessageThread.create({ messages: msgData }, (err, msgData) => {
      if (err) return console.log('Whoopsies! Issue with querying data.');
      console.log("Sent message to DB", msgData);
      // res.send(msgData);
    })
  })
  socket.on('disconnect', () => {
    console.log('a user has disconnected');
  })
})

// * catch-all error handler
app.all('*', (req, res) => res.status(404).send('Whoopsies! Page not found!'));

http.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
});