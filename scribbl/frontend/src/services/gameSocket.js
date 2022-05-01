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

const socket = new GameSocket();
// const BASE_URL = "https://scribbl-server.herokuapp.com/";
const LOCAL_URL = "http://127.0.0.1:8000"
socket.init(LOCAL_URL);

module.exports = socket;
