import React, { Component } from 'react';
//import { w3cwebsocket as W3CWebSocket } from "websocket";
//import ws from 'react';
//import { WebSocketSubject, webSocket } from 'webSocket';
//var time = time
//WebSocket is not open: readyState 2 (CLOSING)
//const WebSocket = require('ws');
var socket = new WebSocket('ws://localhost:8090/warnings');

function SocketRun() {
  socket.onopen = function() {
    console.log('open')
  }
  
  socket.onmessage = function(ev) {
    let _data = JSON.parse(ev.data);
  
    console.log(_data);
  }
  
}

function getCheckboxStatus(){
  const e = document.getElementById("check")
  return e.target.checked
}

class App extends Component {
  componentWillMount() {

    SocketRun()

    socket.onopen = function(e) {
      alert("[open] Connection established");
      alert("Getting data from Server");
      socket.send("subscribe");
    };
    
    socket.onmessage = function(event) {
      alert(`[message] Data received from server: ${event.data}`);
      document.getElementById('root').append(event.data)
      console.log(event.data)
      getCheckboxStatus()
    };
    
    socket.onclose = function(event) {
      if(document.getElementById("check").checked === true)
      {
        alert('[close] Connection closed');
        socket.send("unsubscribe");
      }
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
  }
  
  render() {
    return (

      <div className="App">
      <header className="App-header">
      <form>
          <label>Unsubscribe ? </label>
          <input type="checkbox" id = "check" /><br/><br/>
          <label>Choose a date:</label>
          <br/><br/>
          <input type="datetime-local" id = "date"/>
          <br /><br/>
          <label>Data</label>
          <br />
          </form>
      </header>
    </div>
        
    );
  }
}

export default App;

