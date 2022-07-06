const express = require('express');
const app = express();
const http = require('http');
const dotenv = require('dotenv');
var cors = require('cors');
const server = http.createServer(app);

dotenv.config();

const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

const ChatHandlers = require("./handlers/chat_handlers");
const CanvasHandlers = require("./handlers/canvas_handlers");
const SessionHandler = require("./handlers/game_session");
const GameSocketService = require("./services/game_socket.js");

let gameSocket = new GameSocketService();
gameSocket.init(server);

ChatHandlers(gameSocket.getInstance());
CanvasHandlers(gameSocket.getInstance());
SessionHandler(gameSocket.getInstance());
// const { instrument } = require("@socket.io/admin-ui");


app.get("/", (req, res)=>{
  res.send("Srever Running");
});


// instrument(io, {
//   auth: false
// });
server.listen(port, ()=>{
  console.log(`server running on ${port}`);
})