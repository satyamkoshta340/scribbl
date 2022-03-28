import React, {useState} from 'react';
import { Link } from "react-router-dom";



const BASE_URL = "http://127.0.0.1:8000/api/sessions";
export default function Home() {
  const [id, setId] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  const startGame = async () => {
    console.log("start game");
    const response = await fetch(`${BASE_URL}`,{ 
      method: "POST",
      headers:{
          'Content-Type': 'application/json'
      },
      mode: 'cors',
      
    })
    
    
    const session = await response.json();
    console.log(session);
    return session.id;
  }
  
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
      alert("Text has been copied, now paste in the text-area")
    }
  }
  return (

    <div className='flex-col-container root' >
        <div className='flex-container btn logo'>LOGO</div>
        {
          !isGenerated && <>
            <div className="btn" onClick={async ()=>{
              const ID = await startGame();
              setId(ID);
              console.log("done");
              setIsGenerated(true);
            }}>Generate</div>

            <div>
              Generate room link to share with your Friends.
            </div>
          </>
        }
        {
          isGenerated && <>
            <div id='game-link'>
              {`http://127.0.0.1:3000/landing/${id}`}
            </div>
            <div className='btn'  onClick={()=> CopyToClipboard("game-link")}>copy</div>
            <Link to={`/landing/${id}`} className='flex-container btn start'>Start</Link>
          </>
        }
        
        
    </div>
  )
}
