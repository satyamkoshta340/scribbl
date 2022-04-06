import React, {useState, useEffect} from 'react'
import Canvas from "../components/canvas";
import Chat from  "../components/chat";
import GameSocket from '../services/gameSocket';
import { useParams } from 'react-router-dom';

export default function GamePlay({timer, rounds, setRounds, name}) {
  const [players, setPlayers] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const socket = GameSocket.getSocket();
  const [word, setWord] = useState("");
  const [clock, setClock] = useState(0);
  const [leaderBoard, setLeaderBoared] = useState({});
  const [end, setEnd] = useState(false);

  let canvas;
  let params = useParams()
  const id = params.id;
  let popup;
  let popupInside;

  socket.on("room/sync", (activePlayers)=>{
    setPlayers(activePlayers);
    console.log("got players");
    // console.log(players);
  })
  useEffect(()=>{
    socket.emit("room/sync", id);
  }, [1])

  socket.on("picking-word", (player, socketId)=>{
    if(socketId === socket.id)return;
    popup = document.getElementById('pop-up');
    popupInside = document.getElementById("pop-up-inside");
    popupInside.textContent = `${player} is picking the word.`;
    console.log(`${player} is picking the word.`)
    popup.classList.add("pop-up-active");
    setTimeout(()=>{
      popup.classList.remove("pop-up-active");
      setClock(timer);
    }, 2000)
  })

  socket.on("pick-word", (currWord)=>{
    console.log("picking word...")
    setDrawer(true);
    setWord(currWord);
    setTimeout(()=>{
      setClock(timer);
    }, 2000)
  })

  useEffect(()=>{
    if(clock ===0){
      if(drawer){
        if(rounds>1){
          setDrawer(false);
          socket.emit("another-round", id);
        }
        else{
          //game end
          socket.emit("end-game", id);
        }
      }
      setRounds(rounds-1);
      return;
    }
    setTimeout(()=>{setClock(clock-1)}, 1000);
    
  }, [clock])
  

  useEffect(()=>{
    // console.log(id);
    canvas = document.getElementById("canvas");
    if(drawer){
      canvas.classList.remove("disabled");
    }
    else {
      if(!canvas.classList.contains("disabled")){
        canvas.classList.add("disabled");
      }
    }
    // socket.emit("room/sync", id);
    // socket.emit("start-rounds", id);
  }, [drawer])

  socket.on("end-game", (leaderBoard)=>{
    // console.log(leaderBoard);
    popup = document.getElementById('pop-up');
    popupInside = document.getElementById("pop-up-inside");
    popup.classList.add("pop-up-active");
    setLeaderBoared(leaderBoard);
    setEnd(true);
  })
  
  return (
    <div className='root'>
      <h1 className='title'>Scribbl</h1>
      <div className='clock'>{clock}</div>
      <div className='flex-container-space-even'>
        <div className='player-container'>
          <div className='players'>
            {
              players.map((player)=>{ 
              return (<div className='player-item' key={player.id}> 
                <div>{player.name}</div>
                {/* <div>{player.score}</div> */}
                {/* <div>0</div> */}
              </div>)
              })
            }
          </div>
        </div>
        <div>
          {
            drawer && <>
            <div className='current-word'>{word}</div>
            </>
          }
          
          <div id='canvas'>
            <Canvas />
          </div>
        </div>
        
        <Chat sessionId={id} name={name}/>
      </div>
      <div className='pop-up' id='pop-up'>
        {
          !end && <>
          <div className='pop-up-inside' id='pop-up-inside'></div>
          </>
        }
        
        {
            end && <>
            <div className='player-container'>
              <div className='players'>
                {
                  Object.keys(leaderBoard).map((player, i)=>{ 
                  return (<div className='player-item' key={i}> 
                    <div>{leaderBoard[player].name}</div>
                    <div>{leaderBoard[player].points}</div>
                  </div>)
                  })
                }
              </div>
            </div>
            </>
          }
      </div>
    </div>
  )
}
