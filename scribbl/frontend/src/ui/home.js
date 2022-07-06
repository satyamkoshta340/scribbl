import React, {useState} from 'react';
import { Link } from "react-router-dom";
import GameSocket from "../services/gameSocket";
import Avatar from '../components/avatar';

const socket = GameSocket.getSocket();

socket.on("connect", ()=>{
  console.log("connected")
  console.log(socket.id);
})

export default function Home({name, setName, setFlag}) {
  const [isGenerated, setIsGenerated] = useState(false);
  
  const [sessionId, setSessionId] = useState();
  
  const startSession = () => {
    console.log("starting Session");
    socket.emit("start-session", name);
  }
  socket.on("game-started" , id => {
    console.log(id);
    setSessionId(id);
    setIsGenerated(true);
    setFlag(true);
  })
  // socket.on("disconnect", ()=>{
  //   socket.emit("disconnect", sessionId);
  // })
  
  function CopyToClipboard(containerid) {
    if (document.selection) {
      var range = document.body.createTextRange();
      range.moveToElementText(document.getElementById(containerid));
      range.select().createTextRange();
      document.execCommand("copy");
    } else if (window.getSelection) {
      range = document.createRange();
      range.selectNode(document.getElementById(containerid));
      window.getSelection().addRange(range);
      document.execCommand("copy");
      // alert("Text has been copied, now paste in the text-area")
    }
  }
  return (

    <div className='flex-col-container root' id='home'>
        {/* <div className='flex-container btn logo'>LOGO</div> */}
        <h1 id="title">Scribbl</h1>
        <Avatar />
        {
          !isGenerated && <>
            <div>
              <input type="text" id='name-input' placeholder='Name' onChange={(e)=>{setName(e.target.value)}}></input>
            </div>
            <div className="btn" onClick={()=>{ startSession()}}>Generate Room</div>

            <div className='info'>
              Generate room link to share with your Friends.
            </div>
          </>
        }
        {
          isGenerated && <>
            <div id='game-link' className='info'>
              {`https://scribbl-frontend.herokuapp.com/landing/${sessionId}`}
            </div>
            <div className='btn'  onClick={()=> CopyToClipboard("game-link")}>Copy</div>
            <Link to={`/waitingHall/${sessionId}`} className='flex-container btn start'>Start</Link>
          </>
        }
    </div>
  )
}