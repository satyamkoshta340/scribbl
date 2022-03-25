import React from 'react'

const startGame = () =>{
    console.log("start game")
}
export default function Home() {
  return (
    <div className='flex-col-container root'>
        <div className='flex-container btn logo'>LOGO</div>
        <div className='flex-container btn start' onClick={()=>startGame()}>Start</div>
    </div>
  )
}
