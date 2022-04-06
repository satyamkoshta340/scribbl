const {v4} = require('uuid')
class Player {
    constructor(socket, name){
        this.playerId = v4();
        this.socket = socket;
        this.name =name;
        this.rooms = [this.playerId];
        this.avatar = "";
        // this room is require to talk 1 to 1
        this.socket.join(this.rooms);
    }
}

module.exports = Player;