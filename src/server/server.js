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
    origin: "https://localhost:8080",
    methods: ["GET", "POST"]
  }
});

//https://atlantisworld.netlify.app/

/** */
/**GLOBAL VARIABLES */
/** */
var players = [];
var users;
var playerList = [];
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
    
// send player list to socket and new player to everyone else
  socket.on("playerJoined", onPlayerJoined);

// debug tools
  socket.on("test", onTest);

// send player data to remove them from being rendered
  socket.on("removePlayer", onRemovePlayer);

// send updated player move data to all other sockets
  socket.on("playerMoved", onPlayerMoved);


// testing alternate move method 
  socket.on("playerMovedTest", onPlayerMovedTest);

//when sockets leave
  socket.on('close', onClose);
  socket.on('disconnect', onDisconnect);

//catch errors
  socket.on("list items", onListItems);

//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
});

/** */
/** CALLBACK FUNCTION DEFINITIONS */
//** */

// adds new player to players array and send back to same socket, and sends individual player data to all other sockets
function onPlayerJoined(player) {
// players obj struct
  const socketId = this.id;
  players[socketId] = {
    player_id: socketId,
    username: player.username,
    x: player.x,
    y: player.y,
    tilePos: player.tilePos,
    direction: player.direction
  };
//create and filter player list
  playerlist = [];
  for(i = 0; i < count; i++) {
    if(users[i]) {
      playerList[i] = players[users[i][0]];
    }
  }
  const filteredList = playerList.filter(item => item != null);
  playerList = filteredList;
// sends new player data and players array back to socket
  this.emit("verifyConnect", players[socketId], playerList);
// sends new player data to all other sockets
  this.broadcast.emit("newPlayer", players[socketId]);
};

// send back confirmation of test call
function onTest() {
  console.log("player hit test button");
  this.emit("testPass");
  this.broadcast.emit("removePlayer", this.id);
}

function onRemovePlayer() {
  console.log("removing player");
  //socket.broadcast.emit("removePlayer", socket.id);
}

function onPlayerMoved(direction, tilePos) {
// update tile pos
  players[this.id].tilePos = tilePos;
// send info to other players' movement intent
  this.broadcast.emit("playerMoved", this.id, direction);
}

function onPlayerMovedTest(newObj, direction) {
  players[this.id].tilePos = newObj;
  this.broadcast.emit("playerMovedTest", newObj, direction, this.id);
}

function onClose() {
  console.log('Client disconnected');
}

function onDisconnect() {
  delete players[this.id];
  console.log('Client disconnected');
}

// listens to catch errors
async function onListItems(callback) {
  try {
    const items = await findItems();
    callback({
      status: "OK",
      items
    });
  } catch (e) {
    callback({
      status: "NOK"
    });
  }
}