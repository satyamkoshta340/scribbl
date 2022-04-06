const Player = require("../models/player");
const LiveGameService = require("../services/live_game_service");

module.exports = (io) => {
    io.on("connection", socket =>{

        socket.on("start-session", (name) =>{
            const player =new Player(socket, name);
            const gameSession = LiveGameService.createGame(socket);
            if(!gameSession)return
            gameSession.addPlayer(player);
            console.log(`session created : ${gameSession.sessionsId}`);
            io.to(socket.id).emit("game-started", gameSession.sessionsId);
            // console.log(gameSession.players);
        })

        socket.on("join-game", (sessionId, name)=>{
            const player = new Player(socket, name);
            const gameSession = LiveGameService.findGame(sessionId);
            if(!gameSession)return
            gameSession.addPlayer(player);
            // console.log(gameSession.players);
        })

        socket.on("room/sync", (sessionId)=>{
            const gameSession = LiveGameService.findGame(sessionId);
            if(!gameSession)return
            // console.log("game:", gameSession.players);
            const acivePlayers = gameSession.players;
            const host = gameSession.host;
            io.to(sessionId).emit("room/sync",  acivePlayers, host);
        })

        socket.on("start-game",(sessionId, rounds, timer) => {
            io.to(sessionId).emit("game-started", rounds, timer);
            const gameSession = LiveGameService.findGame(sessionId);
            if(!gameSession)return
            gameSession.roundStart();
            if(!gameSession.drawer) return
            // console.log(gameSession.drawer.id);
            
            io.to(gameSession.drawer.id).emit("pick-word", gameSession.currentWord);
            io.to(sessionId).emit("picking-word", gameSession.drawer.name, gameSession.drawer.id);

        })

        socket.on("another-round", (sessionId)=>{
            const gameSession = LiveGameService.findGame(sessionId);
            if(!gameSession)return
            gameSession.roundStart();
            if(!gameSession.drawer) return
            // console.log(gameSession.drawer.id);
            
            io.to(gameSession.drawer.id).emit("pick-word", gameSession.currentWord);
            io.to(sessionId).emit("picking-word", gameSession.drawer.name, gameSession.drawer.id);
            io.to(sessionId).emit("draw/command", [[3, 0, 0, 'rgb(255, 255, 255)', 0]]);
        })

        socket.on("guess", (sessionId, guess)=>{
            const gameSession = LiveGameService.findGame(sessionId);
            if(!gameSession)return;
            if(socket.id = gameSession.drawer.id) return;
            gameSession.playerMakeGuess(socket.id, guess);
        })

        socket.on("end-game", (sessionId)=>{
            const gameSession = LiveGameService.findGame(sessionId);
            if(!gameSession)return;
            io.to(sessionId).emit("end-game", gameSession.getLeaderBoard());
        })
    })
}