const { v4 } = require('uuid');
// const { default: socket } = require('../../frontend/src/services/gameSocket');
const data = require("../data/data.json");
const len = data.words.length;

class GameSession{
    constructor(){
        this.sessionsId = v4();
        this.players = [];
        this.drawer = null;
        this.currentWord =null;
        this.host = null;
        this._scoreBoard = {};
        this._nextDrawerIndex = 0;
    }

    addPlayer(player) {
        this.players.push({
            "name": player.name,
            "avatar": player.avatar,
            "id": player.socket.id,

        });
        this._scoreBoard[player.socket.id] = {
            points: 0,
            name: player.name
            // roundScore: {}
        }
        player.rooms.push(this.sessionsId);
        player.socket.join(player.rooms);
    }

    removePlayer(id){
        var _new_players = [];
        this.players.forEach((player)=>{
            if(player.id !== id){
                _new_players.push(player);
            }
        })
        this.players = _new_players;
    }

    roundStart() {
        if(this.players.length > 1) {
            this.drawer = this.players[this._nextDrawerIndex];

            let n = Math.floor(Math.random()*len);
            this.currentWord = data.words[n];
            this._nextDrawerIndex = (this._nextDrawerIndex + 1) % this.players.length;
        }
    }

    playerMakeGuess(playerId, guess) {
        if(this.currentWord === guess){
            this._scoreBoard[playerId].points += 10;
        }
    }

    getLeaderBoard(){
        return this._scoreBoard;
    }
}

module.exports = GameSession;