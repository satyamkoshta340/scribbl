import React, { useEffect } from 'react'
import gameSocket from "../services/gameSocket.js";
const socket = gameSocket.getSocket();
var fontX = 5;
var fontY = 5;
var mayDrag;
var currStyle = 'rgb(255, 255, 255)';
var eraser = false;
var prevX, prevY, currX, currY;

var canvas = null;
var ctx = null;

let batch = []
let isRequestTimed = false
const eraseOnCanvas = (currX, currY)=>{
    ctx.fillStyle = currStyle;
    ctx.fillRect(currX, currY, fontX, fontY);
}

const drawOnCanvas = (prevX, prevY, currX, currY) =>{
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.stroke();
    
}

function sendDrawCommand(command, currX, currY) {
    batch.push([command, prevX, prevY, currX, currY])
    if (!isRequestTimed) {
        setTimeout(() => {
        socket.emit("draw/command", batch);
        isRequestTimed = false;
        batch = [];
        }, 50);
        isRequestTimed = true;
    } 
}

const paint = (color)=>{
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 600, 400);
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

socket.on("connect", ()=>{
    console.log("connected");
})
socket.on("draw/command", (commands)=>{
    console.log("command");
    commands.forEach(command => {
        if (command[0] === 0) /* drawing */ {
            console.log("drawing")
            drawOnCanvas(command[1], command[2], command[3], command[4])
        } else if (command[0] === 1) /* erasing */ {
            eraseOnCanvas(command[3], command[4])
        } else if (command[0] === 2) /* set line width */{
            setLineWidth(command[3]);
        } else if( command[0] === 3){
            paint(command[3]);
        }
    })
})
export default function Canvas() {
    
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
                    sendDrawCommand(1, currX, currY);
                }
                else{
                    drawOnCanvas(prevX, prevY, currX, currY);
                    sendDrawCommand(0, currX, currY);
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
    
    <div className="canvas-box">
        <canvas id="play-ground" width="600" height="400"></canvas>
        <div className="canvas-tools">
            <div className="tool paint-green" onClick={() =>{
                sendDrawCommand(3,'rgb(0, 128, 0)' , 0);
                paint('rgb(0, 128, 0)')}}></div>
            <div className="tool paint-blue" onClick={() =>{
                sendDrawCommand(3, 'rgb(0, 0, 255)', 0);
                paint('rgb(0, 0, 255)')}}></div>
            <div className="tool paint-red" onClick={() =>{
                sendDrawCommand(3, 'rgb(255, 0, 0)', 0);
                paint('rgb(255, 0, 0)')}}></div>
            <div className="tool paint-white" onClick={ ()=>{
                sendDrawCommand(3, 'rgb(255, 255, 255)', 0);
                paint('rgb(255, 255, 255)')}}></div>
            <div className="tool eraser" onClick={ ()=>erase()}>E</div>
            <div className="tool pen" onClick={()=>selectPen()}>✏️</div>
            <div className="tool lineWidth" onClick={ ()=>{
                sendDrawCommand(2, 1, 0);
                setLineWidth(1)}}>1</div>
            <div className="tool lineWidth" onClick={ ()=>{
                sendDrawCommand(2, 3, 0);
                setLineWidth(3)}}>2</div>
            <div className="tool lineWidth" onClick={ ()=>{
                sendDrawCommand(2, 5, 0);
                setLineWidth(5)}}>3</div>

        </div>
    </div> 
    

  )
}
