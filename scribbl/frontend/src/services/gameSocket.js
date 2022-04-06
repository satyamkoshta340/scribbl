const { io } = require("socket.io-client");


class GameSocket {
    socket = null;

    init(http_server){
        if(this.socket){
            return;
        }
        this.socket = io(http_server);
    }

    getSocket(){
        return this.socket;
    }
}
// const socket =  io("http://127.0.0.1:3000");
const socket = new GameSocket();
socket.init("http://127.0.0.1:8000");
// socket.on("connect", ()=>{
//     console.log("connected");
// })
// console.log(socket.id)
module.exports = socket;

// export default socket;