
// * setting up express && mongoose here

const express = require('express');

const app = express();
const port = 3000;
const mongoose = require('mongoose');

// * establish body-parser and use it to be able to access data in a readable format
const bodyParser = require('body-parser');


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

// mongodb+srv://rella_db_chat:iFtMZb9.znUo!uxBTMqt@cluster0-zqzvp.mongodb.net/test?retryWrites=true&w=majority

// * posting and saving msg to the database with error handler

app.use(bodyParser.json());

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
// app.use('/', (req, res) => {
//   //res.sendFile(__dirname +'/index.html');
//   res.send('Jello World!');
// });


// * catch-all error handler
app.all('*', (req, res) => res.status(404).send('Whoopsies! Page not found!'));
// app.get('/', (req, res) => res.send('Hello World!'));


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
