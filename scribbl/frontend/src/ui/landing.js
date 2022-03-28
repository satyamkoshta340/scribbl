import React, { useEffect} from 'react';
import {Link, useParams} from "react-router-dom";

var fontX = 5;
var fontY = 5;
var mayDrag;
var currStyle = 'rgb(255, 255, 255)';
var eraser = false;
var prevX, prevY, currX, currY;
var flag = true;
var canvas = null;
var ctx = null;

const paint = (color)=>{
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 200, 250);
  currStyle = color;
}

const erase = ()=>{
  eraser = true;
}

const selectPen = () =>{eraser = false}
const setLineWidth = (n) =>{
  ctx.lineWidth = n;
  fontX = 5*n;
  fontY = 5*n;
}
const eraseOnCanvas = (currX, currY)=>{
  if(!flag) return;
  ctx.fillStyle = currStyle;
  ctx.fillRect(currX, currY, fontX, fontY);
}

const drawOnCanvas = (prevX, prevY, currX, currY) =>{
  if(!flag) return;
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currX, currY);
  ctx.stroke();
  
}
export default function Landing() {
  
  const params = useParams();
  const id = params.id;
  useEffect(()=>{
    canvas = document.getElementById("play-ground");
    ctx = canvas.getContext('2d');
    ctx.fillStyle = currStyle;


    canvas.addEventListener("mousedown", (e)=>{
        prevX = e.offsetX;
        prevY = e.offsetY;
        mayDrag = true;
    })

    canvas.addEventListener("mousemove", (e)=>{
        // console.log(e.offsetX);
        currX = e.offsetX;
        currY = e.offsetY;
        if(mayDrag){
            // ctx.fillRect(e.offsetX, e.offsetY, fontX, fontY);

            // try lines
            if(eraser){
                eraseOnCanvas(currX, currY);
                
            }
            else{
                drawOnCanvas(prevX, prevY, currX, currY);
                prevX = currX;
                prevY = currY;
            }
            
        }
    })

    canvas.addEventListener("mouseup", (e)=>{
        mayDrag = false;
    })
})

  return (
    <div className='flex-col-container root'>
        <div className='logo' id='logo-landing'>LOGO</div>
        <div className="avatar-box flex-col-container">
          <canvas id="play-ground" width="200" height="250"></canvas>
          <div className="canvas-tools">
              <div className="tool paint-green" onClick={() =>{paint('rgb(0, 128, 0)')}}></div>
              <div className="tool paint-blue" onClick={() =>{paint('rgb(0, 0, 255)')}}></div>
              <div className="tool paint-red" onClick={() =>{paint('rgb(255, 0, 0)')}}></div>
              <div className="tool paint-white" onClick={ ()=>{paint('rgb(255, 255, 255)')}}></div>
              <div className="tool eraser" onClick={ ()=>erase()}>E</div>
              <div className="tool pen" onClick={()=>selectPen()}>✏️</div>
              <div className="tool lineWidth" onClick={ ()=>{setLineWidth(1)}}>1</div>
              <div className="tool lineWidth" onClick={ ()=>{setLineWidth(3)}}>2</div>
              <div className="tool lineWidth" onClick={ ()=>{setLineWidth(5)}}>3</div>
          </div>
        </div> 

        <Link to={`/waitingHall/${id}`} className='flex-container btn start start-landing'>Start</Link>
        
    </div>
  )
}
