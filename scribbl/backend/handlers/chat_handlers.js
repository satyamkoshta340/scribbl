module.exports = function(io) {
        
    io.on('connection', socket => {
        console.log(socket.id)

        // socket.on('custom-event', (number, text, obj) =>{
        //     console.log(number, text, obj)
        // })

        socket.on('send-message', (message, room) =>{
        // io.emit('recieve-messages', message)
        // socket.broadcast.emit('recieve-messages', message);
        // console.log(message);

        if(room === "") socket.broadcast.emit('recieve-messages', message);
        else{
            socket.to(room).emit('recieve-messages', message);
        }
        })

        socket.on('join-room', (room, displayMessage)=>{
        socket.join(room);
        displayMessage(`Joined room: ${room}`)
        })
    })
}