import './App.css';
import Cards from './components/cards';
import io from 'socket.io-client';

var newSocket;

//set up client side socket handshake
function connectSocket() {
  // point to server
  newSocket = io("https://remember-me-server.herokuapp.com/");

  newSocket.on("connect", onSocketConnect);
  newSocket.on("playerCount", onPlayerCount);
}

function onSocketConnect() {
  console.log("connected to socket");
}

function onPlayerCount(count, users) {

  console.log(count);
  console.log(users);
}

//connectSocket();

function App() {
  return (
    <>
      <div className="gameArea">
        <Cards />
      </div>
    </>
    
  );
}

export default App;
