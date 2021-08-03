import './App.css';
import Cards from './components/cards';
import io from 'socket.io-client';

var newSocket;
/*
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
*/

function App() {
  return (
    <>
      <div className="app">
        <main className="gameArea">
          <header>
            <h1 className="gameTitle">
              Remember Me
            </h1>
          </header>
          <Cards />
        </main>
        <article className="aboutArea">
          <header className="aboutHeader">About the Project</header>
          <div className="aboutDetails">
            <p>
              This is a card game built in React using hooks. This is for a Hackathon hosted by Mintbean for Junior Devs. We had 1 week to make a card game using a standard deck. So I decided to make a calm memory game.
            </p>
            <p>
              For this project I decided to not make it in PhaserJS since I wanted to challenge myself to see if I could make a game outside of a game engine. This was good practice in game logic and css tricks.
            </p>
            <p>
              TODO: this project works currently as a single player game, but I have intention to finish the multiplayer aspect of this very soon.
            </p>
          </div>
        </article>
        <footer>
          <h3>find me here:</h3>
          <ul className="socialLinks">
          <li><a href="https://github.com/Jalcantara88"><i className="socialLink fab fa-github fa-2x"></i></a></li>
                            <li><a href="https://www.linkedin.com/in/deadheadstudio/"><i className="socialLink fab fa-linkedin fa-2x"></i></a></li>
                            <li><a href="https://jalcantara.netlify.app/"><i className="socialLink fas fa-folder fa-2x"></i></a></li>
                            <li><a href="https://www.youtube.com/channel/UCzLJQTYgUrhEFAOxt2ek0lg?"><i className="socialLink fab fa-youtube fa-2x"></i></a></li>
                            <li><a href="https://www.behance.net/DeadHead"><i className="socialLink fab fa-behance-square fa-2x"></i></a></li>
          </ul>
        </footer>
      </div>
    </>
    
  );
}

export default App;
