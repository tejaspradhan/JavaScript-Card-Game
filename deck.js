const SUITS = ["♠","♥","♣","♦"]
const VALUES = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]

export default class Deck{
    constructor(cards = createDeck()){
        this.cards = cards
    }

    numberOfCards(){
        return this.cards.length;
    }

    // function to randomly shuffle our cards
    shuffle(){ 
        for(let i = this.numberOfCards()-1; i>0;i--){
            var newIndex = Math.floor(Math.random()*(i+1))
            const temp = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = temp
        }
    }

    pop(){
        return this.cards.shift()
    }
    
    add(card){
        this.cards.push(card)
    }
    
}

class Card{ 
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
    }
    get color(){
        return this.suit==="♠" || this.suit==="♣" ? 'black': 'red'
    }

    getNewCard(){
        const cardDiv = document.createElement('div')
        cardDiv.innerText = this.suit
        cardDiv.classList.add('card', this.color)
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv
    }
}

function createDeck(){
    return SUITS.flatMap(suit=> {
        return VALUES.map(value=>{
            return new Card(suit,value)
        })
    })
}