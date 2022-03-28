import React, {useState} from 'react'
import {Link, useParams,} from "react-router-dom";
import gameSocket from '../services/gameSocket';

export default function WaitingHall() {
  let params = useParams();
  // console.log(searchParams.has('id'));
  const id = params.id;
  console.log(id);
  
    const [players, setPlayers] = useState([]);
    const [settingVisibility, setSettingVisibility] = useState(false);
    const [ruleVisibility, setRuleVisibility] = useState(false);

    const toggleSetting = ()=>{
      setRuleVisibility(false);
      setSettingVisibility(!settingVisibility);
    }
    const toggleRule = ()=>{
      setSettingVisibility(false);
      setRuleVisibility(!ruleVisibility);
    }
    
    const socket = gameSocket.getSocket();
    socket.emit("join-room", id, ()=>{
      console.log("room joined");
    })
    
  return (
    <div className='root flex-col-conatiner'>
        <Link to={`/gamePlay/${id}`} className='btn start'>Start</Link>
        {players.map( player => {
            return <div key={player} className="player">{player}</div>
        })}
        <div className='flex-container'>
          <div className=  {`waitingHall-btn setting-btn ${settingVisibility && "active"}`}  onClick={()=> toggleSetting()}>S</div>
          {settingVisibility && <>
          <div className='setting-box flex-col-container'>
            setting
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
    </div>
  )
}
