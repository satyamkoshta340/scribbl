import React, {useState} from 'react'

export default function WaitingHall() {
    const [players, setPlayers] = useState([]);
  return (
    <div className='root flex-col-container'>
        <div className='btn start '>Start</div>
        {players.map( player => {
            return <div key={player} className="player">{player}</div>
        })}
    </div>
  )
}
