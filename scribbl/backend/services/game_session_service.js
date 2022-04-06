const io = require('socket.io');
// const GameSession = require('../models/game_session');

const ROUND_DURATION = 30;
const ROUND_BUFFER = 5;
const MAX_ROUNDS = 5;

class GameSessionService {
  constructor(session) {
    this._session = session;
  }

  joinSession(player) {
    this._session.addPlayer(player);
    this.syncRoomState();
  }

  startSessionRound() {
    if (this._session.playedRounds >= MAX_ROUNDS) {
      this.syncRoomState();
      io.to(this._session.sessionId).emit("game/end")
    }

    this._session.roundStart();
    this.sendTheWordToTheDrawer();
    this.syncRoomState();

    setTimeout(() => {
      this.revealTheWord();
      session.roundEnd();
      this.syncRoomState();
    }, ROUND_DURATION * 1000);

    setTimeout(() => {
      this.startSessionRound();
    }, (ROUND_DURATION + ROUND_BUFFER) * 1000);
  }

  playerGuess(player, word) {
    if (this._session.playerMakesAGuess(player, word)) {
      this.syncRoomState(session.sessionId)
    }
  }

  syncRoomState() {
    io.to(this._session.sessionId).emit("sync/room", {

    })
  }

  sendTheWordToTheDrawer() {
    const drawer = this._session.drawer;
    const word = this._session.currentWord;

    io.to(drawer.playerId).emit("round/word", {
      word
    })
  }

  revealTheWord() {
    const word = this._session.currentWord;

    io.to(this._session.sessionId).emit("round/word_reveal", {
      word
    })
  }
}

module.exports = GameSessionService;