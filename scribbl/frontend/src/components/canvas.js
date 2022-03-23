import React, { useEffect } from 'react'

export default function Canvas() {
    var fontX = 5;
    var fontY = 5;
    var mayDrag;
    var currStyle = 'rgb(255, 255, 255)';
    var eraser = false;
    var prevX, prevY, currX, currY;

    var canvas = null;
    var ctx = null;
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
                    ctx.fillStyle = currStyle;
                    ctx.fillRect(e.offsetX, e.offsetY, fontX, fontY);
                }
                else{
                    ctx.fillStyle = 'rgb(0,0,0)';
                    ctx.beginPath();
                    ctx.moveTo(prevX, prevY);
                    ctx.lineTo(currX, currY);
                    ctx.stroke();
                    prevX = currX;
                    prevY = currY;
                }
                
            }
        })

        canvas.addEventListener("mouseup", (e)=>{
            mayDrag = false;
        })
    })

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

  return (
    
    <div className="canvas-box">
        <canvas id="play-ground" width="600" height="400"></canvas>
        <div className="canvas-tools">
            <div className="tool paint-green" onClick={() =>paint('rgb(0, 128, 0)')}></div>
            <div className="tool paint-blue" onClick={() =>paint('rgb(0, 0, 255)')}></div>
            <div className="tool paint-red" onClick={() =>paint('rgb(255, 0, 0)')}></div>
            <div className="tool paint-white" onClick={ ()=>paint('rgb(255, 255, 255)')}></div>
            <div className="tool eraser" onClick={ ()=>erase()}>E</div>
            <div className="tool pen" onClick={()=>selectPen()}>P</div>
            <div className="tool lineWidth" onClick={ ()=>setLineWidth(1)}>1</div>
            <div className="tool lineWidth" onClick={ ()=>setLineWidth(3)}>2</div>
            <div className="tool lineWidth" onClick={ ()=>setLineWidth(5)}>3</div>

        </div>
    </div> 
    

  )
}
