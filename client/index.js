//initializes the socket connection
const socket = io();
//emits value when the send button is clicked
function clicker() {
  socket.emit('click', { 
    username: document.getElementById("username").value, 
    message: document.getElementById("message").value,
    time: Date.now()
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
  
  const userElement = document.createElement(`span`);
  userElement.classList.add('user')
  messageBubble.appendChild(userElement);
  userElement.innerHTML = username
  
  const timeStampElement = document.createElement(`span`);
  timeStampElement.classList.add('time-stamp')
  messageBubble.appendChild(timeStampElement);
  timeStampElement.innerHTML = timeStamp
  
  const messageText = document.createElement(`div`);
  messageText.classList.add('message-text')
  messageBubble.appendChild(messageText)
  messageText.innerHTML = messageBody
  
  const chatScreen = document.getElementById('chatbox');
  chatScreen.appendChild(messageBubble);
  
  chatScreen.scrollTop = chatScreen.scrollHeight
}
