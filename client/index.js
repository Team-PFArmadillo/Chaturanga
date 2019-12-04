
//make initial call to database to get the last 10 messages - Persistent Messages
document.addEventListener('DOMContentLoaded', () => {
  console.log('Function running on doc load')
    fetch('/getmessage')
    .then ((res) => res.json())
    .then ((res) => {
      //loop through last 10 and call createMessageElement to append them to the page
      let num = 10;
      if (res.length < 10){
        num = res.length-1;
      }
      for (let i=num; i >= 0; i-=1) {
        let { message, username, time } = res[res.length-1-i].messages[0];
        createMessageElement(message, username, time);
      }
    })
  })


//initializes the socket connection
const socket = io();
//emits value when the send button is clicked
function clicker() {
  const tempDate = new Date();
  const timeString = (tempDate.getMonth()+1)+'/'+tempDate.getDate() + ' ' + tempDate.getHours() + ":" + tempDate.getMinutes()
  socket.emit('click', { 
    username: document.getElementById("username").value, 
    message: document.getElementById("message").value,
    time: timeString
  });
}
//socket listens for the click emitter from the server and appending to the page

socket.on('click', function(msg){
  const {username, message, time} = msg;
  createMessageElement(message, username, time)
})
//helper function to append messages to a chatbox
function createMessageElement(messageBody, username, timeStamp){
  
  const messageBubble = document.createElement('div');
  messageBubble.classList.add('message-bubble');
  
  const timeStampElement = document.createElement(`span`);
  timeStampElement.classList.add('time-stamp')
  messageBubble.appendChild(timeStampElement);
  timeStampElement.innerHTML = (timeStamp + '  ')

  const userElement = document.createElement(`span`);
  userElement.classList.add('user')
  messageBubble.appendChild(userElement);
  userElement.innerHTML = (username + ': ')
  
  const messageText = document.createElement(`span`);
  messageText.classList.add('message-text')
  messageBubble.appendChild(messageText)
  messageText.innerHTML = messageBody
  
  const chatScreen = document.getElementById('chatbox');
  chatScreen.appendChild(messageBubble);
  
  chatScreen.scrollTop = chatScreen.scrollHeight
}


