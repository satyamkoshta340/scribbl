module.exports = function(io){

    io.on("connection", socket =>{

        socket.on("draw/command", (commands)=>{
            socket.broadcast.emit("draw/command", commands);
        })
    })
}