import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import GameSocket from "../services/gameSocket";
import Avatar from '../components/avatar';

const socket = GameSocket.getSocket();
socket.on("connect", ()=>{
  console.log("connected");
});


export default function Landing({name, setName, flag}) {
  console.log(name);
  const params = useParams();
  const id = params.id;


  // socket.on("disconnect", ()=>{
  //   socket.emit("disconnect", id);
  // })
  const joinGame = ()=>{
    console.log("joining the room")
    socket.emit("join-game", id, name);
  }


  return (
    <div className='flex-col-container root'>
        {/* <div className='logo' id='logo-landing'>LOGO</div> */}
        <h1>Scribbl</h1>
        {
          !flag && <>
            <div>
              <input type="text" id='name-input' onChange={(e)=>{setName(e.target.value)}}></input>
            </div>
          </>
        }
        <Avatar />
        <Link to={`/waitingHall/${id}`} className='flex-container btn start start-landing' onClick={()=>joinGame()}>Start</Link>
        
        
    </div>
  )
}
