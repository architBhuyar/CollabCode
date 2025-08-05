const express = require('express');
const app = express();
const http = require('http');
const{Server} = require('socket.io');
const ACTIONS = require('./src/Actions');

const server = http.createServer(app);

const io = new Server(server);

const userSocketMap = {}; // use reddis to store this
const getAllConnectedClients = (roomId) => {
    return Array.from(io.socket.adapter.rooms.get(roomId) || []).map((socketId) => {
        return {
                socketId,
                userName: userSocketMap[socketId],
            };
        }
    );
};

io.on('connection',(socket)=>{
    socket.on(ACTIONS.JOIN,({roomId,userName}) => {
        userSocketMap[socket.id] = userName;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
    });
});


const PORT = process.env.PORT || 7000;
server.listen(PORT,()=> console.log(`Listening on port ${PORT}`));