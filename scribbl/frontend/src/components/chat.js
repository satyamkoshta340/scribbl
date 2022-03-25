import React from 'react'
import gameSocket from "../services/gameSocket.js";

const displayMessage = (m)=>{
    const div = document.createElement("div");
    div.textContent = m;
    document.querySelector("#message-container").append(div);
}

const socket = gameSocket.getSocket();
// const socket = io("http://127.0.0.1:8000");
socket.on('connect', () =>{
    displayMessage(`You connected with id -> ${socket.id}`);
})
socket.on('recieve-messages', message =>{
    displayMessage(message);
})
// socket.emit('custom-event', 10, "Socketss", {a: 'wind'})


function sendMessage(e) {
    e.preventDefault();
    const div = document.createElement("div");
    const messageInput = document.querySelector("#message-input");
    const message = messageInput.value ;
    messageInput.value = "";
    if(message){
        const roomInput = document.querySelector('#room-input');
        const room = roomInput.value;
        socket.emit('send-message', message, room);
        div.textContent = message;

        document.querySelector("#message-container").append(div)
    }
}
const joinRoom = (e)=>{
    e.preventDefault();
    const roomInput = document.querySelector('#room-input');
    const room = roomInput.value;
    
    socket.emit('join-room', room, information =>{
        displayMessage(information);
    });
}

export default function Chat() {

  return (
    <div className='chat-wrapper'>
        <div id='message-container'></div>
        <form id="form" >
            <label htmlFor="message-input">Message</label>
            <input type="text" id="message-input" />
            <button type="submit" id="send-message-button" onClick={(e)=>sendMessage(e)}>Send</button>
        </form>
        <form>
            <label htmlFor="room-input">Room</label>
            <input type="text" id="room-input" />
            <button type="submit" id="join-room-button" onClick={(e)=>joinRoom(e)}>Join</button>
        </form>
    </div>
  )
}
