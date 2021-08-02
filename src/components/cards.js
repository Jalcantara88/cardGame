import React, {useState} from 'react';
import shuffleDeck from './shuffle';

const RenderCard = ({card}) => {
    console.log("rendering card");
    return(
        <>
            <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    
                </div>
                <div className="flip-card-back">
                    <h1 className="cardFace" style={{color: card.color}}>{card.face}</h1>
                <img className="cardImg" style={{fillColor: card.color}} src={card.suitUrl} alt={card.suit}/>

                </div>
            </div>
            </div> 
        </>
    )
}

/*
        <div className="card justify-content-center" style={{}}>
            <h1 className="cardFace" style={{color: card.color}}>{card.face}</h1>
            <img className="cardImg" style={{fillColor: card.color}} src={card.suitUrl} alt={card.suit}/>
        </div>
        */

const makeCards = (setDeck, setDeckBuilt) => {
    var cardIndex = 0;
    for(let i = 0; i < 4; i++) {
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
            //console.log(deck);
            setDeck(deck => [
                ...deck,
                newCard
            ]);
            //console.log(deck);
            //console.log(cardIndex);
            //console.log(newCard);
            cardIndex++;
        }
    }
    setDeckBuilt(true);
}

const Cards = () => {
    const [deck, setDeck] = useState([]);
    const [deckBuilt, setDeckBuilt] = useState(false);

    if(!deckBuilt) {
        makeCards(setDeck, setDeckBuilt);
        console.log(deck);
    }
    

    const renderedCards = deck.map((card, i) => {
        return(
            <RenderCard
                key={i}
                card={card}
                
            />
        );
        
    })

    return(
        <div className="cardArea">
            <button onClick={() => {
                console.log("clicked button");
                console.log(deck);
                const newDeck = deck;
                shuffleDeck(newDeck);
                setDeck(newDeck);
                console.log(deck);
            }}>shuffle</button>
            <div className="cardHolder">
                {renderedCards}
            </div>
        </div>
    );
}

export default Cards;