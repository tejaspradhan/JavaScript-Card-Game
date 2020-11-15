import Deck from './deck.js'
const player1Slot = document.querySelector(".player1-slot")
const player2Slot = document.querySelector(".player2-slot")
const player1DeckElement = document.querySelector(".player1-deck")
const player2DeckElement = document.querySelector(".player2-deck")
const status = document.querySelector(".game-status")
const restartGame = document.querySelector(".restart")
const nextCard = document.querySelector(".next-turn")
const clearRound = document.querySelector(".clear-round")

const result = document.querySelector(".result")

var player1Deck, player2Deck,inRound
const CARD_VALUE_MAP = {"2":2, "3":3 , "4":4, "5":5 , "6":6 , "7":7 , "8":8, "9":9, "10":10, "J" : 11 , "Q": 12, "K":13, "A":14}


startGame()
function startGame(){
    const deck = new Deck()
    deck.shuffle()
    const mid = Math.ceil(deck.numberOfCards()/2)
    player1Deck = new Deck(deck.cards.slice(0,mid))
    player2Deck = new Deck(deck.cards.slice(mid,deck.numberOfCards()))
    inRound = false
    result.innerText=""
    status.innerText =" "
    player1Slot.innerHTML = ""
    player2Slot.innerHTML = ""
    updateDeckCount()
    
}

function newRound(){
    if(inRound===true){
        status.innerText =" "
        player1Slot.innerHTML = ""
        player2Slot.innerHTML = "" 
        updateDeckCount()
        inRound = false
        if(player1Deck.numberOfCards()==0){
            result.innerText="Player 2 wins the Game"
            result.style.color = "blue"
        }
        
        else if(player2Deck.numberOfCards()==0){
            result.innerText = "Player 1 wins the Game"
            result.style.color = "red"
        
        }
    
    }
    else{
        alert("Round Not Started!")
    } 
}

function updateDeckCount(){
    player1DeckElement.innerText = player1Deck.numberOfCards()
    player2DeckElement.innerText = player2Deck.numberOfCards()
}

function flipCards(){
    if(inRound ===false){
        inRound = true
        const player1Card = player1Deck.pop()
        const player2Card = player2Deck.pop()
        player1Slot.appendChild(player1Card.getNewCard())
        player2Slot.appendChild(player2Card.getNewCard())
        if(getWinner(player1Card,player2Card)==1){
            status.innerText = "Player 1 wins the Round"
            player1Deck.add(player1Card)
            player1Deck.add(player2Card)
        }
        else{
            status.innerText = "Player 2 wins the Round"
            player2Deck.add(player1Card)
            player2Deck.add(player2Card)
        }
    }

    else{
        alert("Round In Progress!")
    }
}
restartGame.onclick = function(){
    startGame()
}

nextCard.onclick = function(){
    flipCards()
}

clearRound.onclick = function(){
    newRound()
}

function getWinner(card1, card2){
    if(CARD_VALUE_MAP[card1.value] > CARD_VALUE_MAP[card2.value])
        return 1
    else
        return 2
}


