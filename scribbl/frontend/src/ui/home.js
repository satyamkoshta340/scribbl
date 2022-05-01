import React, {useState} from 'react';
import { Link } from "react-router-dom";
import GameSocket from "../services/gameSocket";
import Avatar from '../components/avatar';


const socket = GameSocket.getSocket();
// console.log(socket);
socket.on("connect", ()=>{
  console.log("connected")
  console.log(socket.id);
})
// const BASE_URL = "http://127.0.0.1:8000/api/sessions";
//const BASE_URL = "https://scribbl-server.herokuapp.com/";
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

    <div className='flex-col-container root' >
        {/* <div className='flex-container btn logo'>LOGO</div> */}
        <h1>Scribbl</h1>
        <Avatar />
        {
          !isGenerated && <>
            <div>
              <input type="text" id='name-input' placeholder='Name' onChange={(e)=>{setName(e.target.value)}}></input>
            </div>
            <div className="btn" onClick={()=>{ startSession()}}>Generate Room</div>

            <div>
              Generate room link to share with your Friends.
            </div>
          </>
        }
        {
          isGenerated && <>
            <div id='game-link'>
              {`http://127.0.0.1:3000/landing/${sessionId}`}
            </div>
            <div className='btn'  onClick={()=> CopyToClipboard("game-link")}>copy</div>
            <Link to={`/waitingHall/${sessionId}`} className='flex-container btn start'>Start</Link>
          </>
        }
    </div>
  )
}

// const response = await fetch(`${BASE_URL}`,{ 
    //   method: "POST",
      
    //   headers:{
    //       'Content-Type': 'application/json'
    //   },
    //   mode: 'cors',
    //   body: JSON.stringify({
    //     'name': name,
    //     'gameSocket': JSON.stringify(socket, decycle())
    //   }),
      
    // })
    
    
    // const gameSession = await response.json();
    // // console.log(session);
    // setSession(gameSession.session);