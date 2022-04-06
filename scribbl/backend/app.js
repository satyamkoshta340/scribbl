const express = require('express');
const app = express();
const http = require('http');
// const { isObject } = require('util');
var cors = require('cors');
const server = http.createServer(app);

app.use(cors());
// app.use((req, res, next)=>{
//   res.set("Access-Control-Allow-Origin", "http://localhost:3000")
//   res.set("Access-Control-Allow-Origin", "http://127.0.0.1:3000")
//   res.set("Access-Control-Allow-Origin", "http://192.168.1.42:3000")
//   res.set("Access-Control-Allow-Headers", "Content-type")
//   next();
// })
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
  res.send("hello");
});


// instrument(io, {
//   auth: false
// });


server.listen(8000, ()=>{
  console.log("server running on port: 8000");
})