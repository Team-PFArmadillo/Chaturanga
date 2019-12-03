const socket = io();
    function clicker() {
      socket.emit('click', document.querySelector("#textField").value);
    }
        socket.on('click', function(msg){
          const message = document.createElement('p');
          console.log(msg)
          message.innerText = msg;
          document.querySelector("#root").append(message);
          document.querySelector("#textField").value = '';
    })