import React, {useState, useEffect} from 'react'
import {Link, useParams, useNavigate} from "react-router-dom";
import GameSocket from '../services/gameSocket';

export default function WaitingHall({timer , rounds, setRounds, setTimer}) {
  let params = useParams();
  const id = params.id;
  // console.log(id);
  const navigate = useNavigate();

  const socket = GameSocket.getSocket();
  const [players, setPlayers] = useState([]);
  const [settingVisibility, setSettingVisibility] = useState(false);
  const [ruleVisibility, setRuleVisibility] = useState(false);
  const [isHost, setIsHost] = useState(false);

  const toggleSetting = ()=>{
    setRuleVisibility(false);
    setSettingVisibility(!settingVisibility);
  }
  const toggleRule = ()=>{
    setSettingVisibility(false);
    setRuleVisibility(!ruleVisibility);
  }
    
  socket.on("room/sync", (activePlayers, host)=>{
    setPlayers(activePlayers);
    // console.log(players);
    if(socket.id == host) setIsHost(true);
  })

  useEffect(()=>{
    // console.log(id);
    socket.emit("room/sync", id);
  }, [])

  const startGame = () =>{
    socket.emit("start-game", id, rounds, timer);
  }
  socket.on("game-started", (rounds, timer)=>{
    setTimer(timer);
    setRounds(rounds);
    navigate(`../gamePlay/${id}`, {replace:true});
  })
    
  return (
    <div className='root flex-col-conatiner'>
        
        <h1>Scribbl</h1>
        
        <div className='flex-container'>
          <div className=  {`waitingHall-btn setting-btn ${settingVisibility && "active"}`}  onClick={()=> toggleSetting()}>S</div>
          {settingVisibility && <>
          <div className='setting-box flex-col-container'>
            <h2>Settings</h2>
            <div>
              <label for="rounds">Rounds </label>
              <input type="number" name='rounds' defaultValue={rounds} id='rounds' onChange={(e)=> setRounds(e.target.value)} />
            </div>
            
            <div>
              <label for="timer">Timer </label>
              <input type="number" name='timer' defaultValue={timer} id='timer'onChange={(e)=> setTimer(e.target.value)} />
            </div>
          </div>
          </>}
          <div className={`waitingHall-btn rule-btn ${ruleVisibility && "active"}`}  onClick={()=>toggleRule()}>R</div>
          {ruleVisibility && <>
          <div className='rule-box'>
              <ul>
                <li>Welcome to scrribl</li>
                <li>pfsdf</li>
                <li>xcnbvnxc</li>
              </ul>
          </div>
          </>}
        </div>
            {
              isHost && <>
                <Link to={`/gamePlay/${id}`} className='btn' id='start-game-btn' onClick={()=>{startGame()}}>Start</Link>
              </>
            }
        
        <div className='active-players'>
          {players.map( player => {
              return <div key={player.id} className="player">
                <canvas className='player-avatar'></canvas>
                <div className='player-name'> {player.name} </div>
              </div>
          })}
        </div>
    </div>
  )
}
