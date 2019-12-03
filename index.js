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

/* websocket */.onmessage = createMessageElement(messageBody, username, timeStamp) /* insert websocet return value*/




window.onload = function () {
  document.getElementById("send-button").onclick = function () {
    /* websocket */.send(JSON.stringify({ 
      username: document.getElementById("username").value, 
      message: document.getElementById("message").value}));
  }
}