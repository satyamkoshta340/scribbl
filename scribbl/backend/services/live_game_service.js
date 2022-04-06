const GameSession = require("../models/game_session");

class LiveGameService {
    _LIVE_GAMES = {}

    createGame(socket) {
        const gameSession = new GameSession();
        gameSession.host = socket.id;
        this._LIVE_GAMES[gameSession.sessionsId] = gameSession;
        return gameSession;
    }

    findGame(sessionId) {
        return this._LIVE_GAMES[sessionId];
    }
}

module.exports = new LiveGameService();