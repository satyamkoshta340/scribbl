const {Server} = require("socket.io");

// it is a singleton class
// so that every file have same io object
class GameSocket {
    instance = null;

    init(http_server){
        if(this.instance){
            return;
        }
        this.instance = new Server(http_server, {
            cors: {
                origin: [
                    "http://localhost:3000",
                    "http://127.0.0.1:3000",
                    "https://admin.socket.io"
                    ],
            }
            });
    }
    getInstance() {
        return this.instance
    }
}
// getInstance always returns the same instance

module.exports = GameSocket
