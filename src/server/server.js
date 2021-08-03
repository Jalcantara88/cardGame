/** */
/** SET UP SERVER OBJECTS */
/** */
const PORT = process.env.PORT || 3000;
const express = require('express');
const socketIO = require('socket.io');
const app = express();
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000/",
    methods: ["GET", "POST"]
  }
});

//https://atlantisworld.netlify.app/

/** */
/**GLOBAL VARIABLES */
/** */
var players = [];
var users;
var count;

/** */
/** SOCKET SETUP*/
/** */
io.on('connection', (socket) => {
  console.log('Client connected');

//get player count and list of socketids everytime someone connects
  count = io.of("/").sockets.size;
  users = Array.from(io.sockets.adapter.rooms);

//send info to new connected player
  socket.emit("playerCount", count, users);

//when sockets leave
  socket.on('close', onClose);
  socket.on('disconnect', onDisconnect);

//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
});

/** */
/** CALLBACK FUNCTION DEFINITIONS */
//** */

function onClose() {
  console.log('Client disconnected');
}

function onDisconnect() {
  delete players[this.id];
  console.log('Client disconnected');
}
