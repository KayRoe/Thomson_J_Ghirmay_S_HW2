import { Card } from './cards.js' 
export class Game {
    constructor() {
        this.cards = [
            new Card(1, "images/image1.svg", "panda"),
            new Card(2, "images/image2.svg", "giraff"),
            new Card(3, "images/image3.svg", "elephant"),
            new Card(4, "images/image4.svg", "zebra"),
            new Card(5, "images/image1.svg", "panda"),
            new Card(6, "images/image2.svg", "giraff"),
            new Card(7, "images/image3.svg", "elephant"),
            new Card(8, "images/image4.svg", "zebra"),
        ]
        console.log(this.cards)
        this.numClickedCards = 0;
        this.numMatchedCards = 0;
        this.board = document.querySelector('#board')
        this.hasFlippedCard = false
        this.firstCard = null;
        this.secondCard = null;
    }

    reset() {
        this.numClickedCards = 0;
        this.numMatchedCards = 0;
        this.hasFlippedCard = false
        this.firstCard = null;
        this.secondCard = null;
        this.renderBoard();
    }
     
    start() {
        console.log('start game');
        this.renderBoard();
    }

       
    checkForMatch() {
        console.log('board for check', this.board)
        this.numClickedCards = 0;
        if (this.firstCard?.frontAlt === this.secondCard?.frontAlt) {
            this.numMatchedCards += 2;
            if (this.numMatchedCards === this.cards.length) {
                // this.handleGameCompletion();
                console.log('win')
            }
        } else {
            setTimeout(() => {
                this.unflipCards();
            }, 1000);
        }
    }

    flipCard(e) {
        const card = e.target.parentNode; 
        console.log('card', card)
        console.log('first card', this.firstCard)
        console.log('second card', this.secondCard)
        if ( card === this.firstCard) return
        console.log('id', e.target.parentNode.id)
        const cardInClass = this.cards.find(c => c.id === parseInt(e.target.parentNode.id));
        console.log('cardInClass', cardInClass)
        this.numClickedCards += 1;
        console.log('is flipped', cardInClass.isFlipped)
        console.log('numClickedCards', this.numClickedCards)
        if (!cardInClass.isFlipped && this.numClickedCards === 1) {
            this.firstCard = cardInClass;
            this.firstCard.isFlipped = true;
            console.log('firstcard', this.firstCard)
        } else if (!cardInClass.isFlipped && this.numClickedCards === 2) {
            this.secondCard = cardInClass;
            this.secondCard.isFlipped = true;
            console.log('secondcard', this.secondCard)
            const card1Front = document.querySelector(`#front-${this.firstCard?.id}`)
            const card1Back = document.querySelector(`#back-${this.firstCard?.id}`)
            const card2Front = document.querySelector(`#front-${this.secondCard?.id}`)
            const card2Back = document.querySelector(`#back-${this.secondCard?.id}`)
            console.log('card1Front', card1Front)
            console.log('card1Back', card1Back)
            console.log('card2Front', card2Front)
            console.log('card2Back', card2Back)

            card1Front?.classList.add('show');
            card1Back?.classList.remove('show');
            card2Front?.classList.add('show');
            card2Back?.classList.remove('show');
            this.checkForMatch();
        }
    }
  
    renderBoard() {
        console.log('render board');
        console.log('board', this.board);
        this.board.innerHTML = '';
        this.cards.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add(card.className);
            cardDiv.id = card.id
    
            const frontImg = document.createElement('img');
            frontImg.classList.add(card.frontClass);
            frontImg.id = `front-${card.id}`;
            frontImg.src = card.frontImgSrc;
            frontImg.alt = card.frontAlt;
    
            const backImg = document.createElement('img');
            backImg.classList.add(card.backClass);
            backImg.id = `back-${card.id}`;
            backImg.classList.add('show');
            backImg.src = card.backImgSrc;
            backImg.alt = card.backAlt;
    
            cardDiv.appendChild(frontImg);
            cardDiv.appendChild(backImg);
            this.board.appendChild(cardDiv);
        });

        const cardElements = document.querySelectorAll('.card');
        cardElements.forEach(card => card.addEventListener('click', this.flipCard.bind(this)));   
    }

   
    unflipCards() {
        console.log('unflipCards')
        const card1Front = document.querySelector(`#front-${this.firstCard?.id}`)
        const card1Back = document.querySelector(`#back-${this.firstCard?.id}`)
        const card2Front = document.querySelector(`#front-${this.secondCard?.id}`)
        const card2Back = document.querySelector(`#back-${this.secondCard?.id}`)
        card1Front?.classList.remove('show');
        card1Back?.classList.add('show');
        card2Front?.classList.remove('show');
        card2Back?.classList.add('show');
        console.log('card1Front', card1Front)
        console.log('card1Back', card1Back)
        console.log('card2Front', card2Front)
        console.log('card2Back', card2Back)

        const card1InClass = this.cards.find(c => c.id === this.firstCard?.id); 
        const card2InClass = this.cards.find(c => c.id === this.secondCard?.id); 
        card1InClass.isFlipped = false;
        card2InClass.isFlipped = false;
        console.log('card1', card1InClass)
        console.log('card2', card2InClass)
    }
}