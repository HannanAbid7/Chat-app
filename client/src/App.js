
import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chat from './chat.js'

const socket=io.connect("http://localhost:3001");

function App() {
  const [username,setUsername]=useState("");
  const [room,setRoom]=useState("");
  const [showchat,setShowchat]=useState(false);

  const joinRoom=()=>{
    if(username!==""&& room!==""){
      socket.emit("join_room",room);
      setShowchat(true);

    }
  };
  return (
    <div className="App">
      {!showchat ?(
      <div className="joinChatContainer">
      <h3>Join A chat</h3>
      <input type='text'
      placeholder='name'
      onChange={(event)=>{
        setUsername(event.target.value);
      }}/>

      <input
      type='text'
      placeholder='room id'
      onChange={(event)=>{
        setRoom(event.target.value);
      }}/>
      <button onClick={joinRoom}>Join A Room</button>
      </div>

     ) :(
<Chat socket={socket} username={username} room={room}/>
     )}
    </div>
  );
}

export default App;
