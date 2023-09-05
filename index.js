const express = require('express')
const http = require('http');
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

let counter = 0;

io.on('connection',(socket)=>{
    socket.emit('updateCounter', counter)

    socket.on('increment',()=>{
        counter++;

        io.emit('updateCounter', counter)
    })
})

server.listen(1122,()=>{
    console.log('server started on port 1122');
})
