import React, {useState, useEffect} from 'react';
import shuffleDeck from './shuffle';

var suitCount = 0;
var cardCount = 0;
var gameOver = false;

function showCards(nodeList) { 
    nodeList.forEach(card => {
        card.classList.toggle("flipped");
        setTimeout(() => {
            card.classList.toggle("flipped");
        }, 1000);
    });
}

function handleClick(event, setNodeSelected) {
        const flipCardInner = event.target.parentNode;
        console.log(flipCardInner);
        flipCardInner.classList.toggle("flipped");
        setNodeSelected(node => [
            ...node,
            flipCardInner
        ]); 
}

function addOrRemove(array, value, setArray, setNodes) {
    var index = array.indexOf(value);

    if(index === -1) {
        setArray(old => [...old, value]);
        //console.log(array);
    }
    else {
        setArray(array.filter(item => item !== value));
        setNodes([]);
        //console.log(array);
    }
}

function checkPair(pair, setPair, nodePair, setNodePair) {
    if(pair[0].value === pair[1].value) {
        console.log("found a pair");
        setTimeout(() => {
            removePair(setPair, nodePair, setNodePair);
          }, 1000);
    }
    else {
        console.log("not a pair");
        setTimeout(() => {
            resetPair(setPair, nodePair, setNodePair);
        }, 1000);
    }
}

function resetPair(setPair, nodePair, setNodePair) {
    console.log(nodePair);
    setPair([]);
    for(let i = 0; i < 2; i++) {
        nodePair[i].classList.toggle("flipped");
    }
    setNodePair([]);
}

function removePair(setPair, nodePair, setNodePair) {
    console.log(nodePair);
    setPair([]);
    for(let i = 0; i < 2; i++) {
        nodePair[i].style.opacity = 0;
    }
    setNodePair([]);
    cardCount -= 2;
}


const RenderCard = ({card, canSelect, setSelected, selected, setNodeSelected, id, setNodeDeck}) => {
    //console.log("rendering card"); 
    return(
            <div className="flip-card">
                <div className="flip-card-inner" onClick={(e) => {
                    if(canSelect && selected.length < 2 && !gameOver) {
                        handleClick(e, setNodeSelected);
                        //setSelected(old => [...old, card]);
                        addOrRemove(selected, card, setSelected, setNodeSelected);
                        
                        //setNodeSelected(old => [...old, e.target]);
                    }
                }} id={id}>
                    <div className="flip-card-front">
                        
                    </div>
                    <div className="flip-card-back">
                        <h1 className="cardFace noClick" style={{color: card.color}}>{card.face}</h1>
                    <img className="cardImg noClick" style={{fillColor: card.color}} src={card.suitUrl} alt={card.suit}/>

                    </div>
                </div>
            </div> 
    )
}

const makeCards = (setDeck, setDeckBuilt) => {
    for(let i = 0; i < suitCount; i++) {
        var suit;
        var color;
        var suitUrl = "";
        switch(i) {
            case 0:
                suit = "hearts";
                color = "#ff4037";
                suitUrl = "suits/hearts.svg";
                break;
            case 1:
                suit = "diamonds";
                color = "#ff4037";
                suitUrl = "suits/diamonds.svg";
                break;
            case 2:
                suit = "spades";
                color = "#1f1b1b";
                suitUrl = "suits/spades.svg";
                break;
            case 3:
                suit = "clubs";
                color = "#1f1b1b";
                suitUrl = "suits/clubs.svg";
                break;
            default:
                console.log("default");
        }
        for(let j = 0; j < 13; j++) {
            var face = j + 1;
            switch(face) {
                case 11:
                    face = "J";
                    break;
                case 12:
                    face = "Q";
                    break;
                case 13:
                    face = "K";
                    break;
                case 1:
                    face = "A";
                    break;
                default:
                    face = face.toString();
            };
            const newCard = {
                suit: suit,
                face: face,
                value: j + 1,
                color: color,
                suitUrl: suitUrl
            };
            setDeck(deck => [
                ...deck,
                newCard
            ]);
        }
    }
    setDeckBuilt(true);
    cardCount = suitCount * 13;
}

function checkWin() {
    if(cardCount === 2) {
        console.log("you win");
        gameOver = true;
    }
    else {
        console.log("keep playing");
    }
}
const Cards = () => {
    const [deck, setDeck] = useState([]);
    const [deckBuilt, setDeckBuilt] = useState(false);
    const [selected, setSelected] = useState([]);
    const [canSelect, setCanSelect] = useState(false);
    const [nodeSelected, setNodeSelected] = useState([]);
    const [nodeDeck, setNodeDeck] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);


    useEffect(() => {
        console.log(selected);
        if(selected.length === 2) {
            checkPair(selected, setSelected, nodeSelected, setNodeSelected);
            checkWin();
        }
    },[selected]);

    if(!deckBuilt) {
        makeCards(setDeck, setDeckBuilt);
    }
    

    const renderedCards = deck.map((card, i) => {
        //console.log("rendering card " + i);
        return(
            <RenderCard
                key={i}
                card={card}
                canSelect={canSelect}
                setSelected={setSelected}
                selected={selected}
                setNodeSelected={setNodeSelected}
                setNodeDeck={setNodeDeck}
                id={i}
            />
        );
    })

    if(!gameStarted) {
        return(
            <section className="menu">
                <h3 className="menuTitle">
                    Please Select A Difficulty:
                </h3>
                <button className="menuButton" onClick={() => {
                    suitCount = 2;
                    makeCards(setDeck, setDeckBuilt);
                    setGameStarted(true);
                }}>Normal</button>
                <button className="menuButton" onClick={() => {
                    suitCount = 4;
                    makeCards(setDeck, setDeckBuilt);
                    setGameStarted(true);
                }}>Hard</button>
                <article className="instruct">
                    <header className="instructTitle">Instructions</header>
                    <p className="instructDetails">
                        Welcome to Remember Me, a standard card based memory game. Select Difficulty of either normal(2 suits) or hard(4 suits). you only need your mouse to click on pairs of cards until you have matched them all. There is no rush, take your time. Relax. and enjoy yourself.
                    </p>
                    <p> More Features to come!</p>
                </article>
            </section>
        )
    }

    else {
        return(
            <div className="cardArea">
                <button onClick={() => {
                    console.log("shuffled");
                    const newDeck = deck;
                    shuffleDeck(newDeck);
                    setDeck([...newDeck]);
                    console.log(deck);
                }}>shuffle</button>
                <button onClick={() => {
                    console.log("toggled Move");
                    console.log(canSelect);
                    setCanSelect(!canSelect);
                }}>toggleMove</button>
                <button onClick={() => {
                    showCards(nodeDeck);
                }}>showCards</button>
                <div className="cardHolder">
                    {renderedCards}
                </div>
            </div>
        );
    }
}

export default Cards;