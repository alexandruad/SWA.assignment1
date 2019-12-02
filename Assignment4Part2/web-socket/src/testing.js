import React from 'react';
import logo from './logo.svg';
import './App.css';

/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */


class App extends Component {
  componentWillMount() {
    client.onopen = () => {
     console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      const stateToChange = {};
      if (dataFromServer.type === "userevent") {
        stateToChange.currentUsers = Object.values(dataFromServer.data.users);
      } else if (dataFromServer.type === "contentchange") {
        stateToChange.text = dataFromServer.data.editorContent || contentDefaultMessage;
      }
      stateToChange.userActivity = dataFromServer.data.userActivity;
      this.setState({
        ...stateToChange
      });
    };
  }
}



let socket = new WebSocket("ws://localhost:8090/warnings");

socket.onopen = function(e) {
  alert("[open] Connection established");
  alert("Getting data from Server");
  socket.send("subscribe");
};

socket.onmessage = function(event) {
  alert(`[message] Data received from server: ${event.data}`);
  let message = (event.data).json;

  let messageElem = document.createElement('div');
  messageElem.textContent = message;
  document.getElementById('messages').get(messageElem);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    alert('[close] Connection died');
    socket.send("unsubscribe");
  }
};

socket.onerror = function(error) {
  alert(`[error] This is a test Error, ${error.message}`);
  socket.send("unsubscribe");
};  

/* // I'm maintaining all active connections in this object
const clients = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

wsServer.on('request', function(request) {
  var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))
}); */



export default App;












import React from "react";
import "./App.css";

function App() {
  io.on('connection', socket => {
    socket.emit('request', "subscribe"); // emit an event to the socket
    io.emit('broadcast', /* … */); // emit an event to all connected sockets
    socket.on('reply', () => { /* … */ }); // listen to the event
  });

  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;