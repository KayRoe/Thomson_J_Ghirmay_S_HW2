export class Card {
    constructor(id, frontImgSrc, frontAlt) {
        this.id = id;
        this.className = "card";
        this.frontImgSrc = frontImgSrc;
        this.isFlipped = false;
        this.backImgSrc = "images/back.svg";
        this.frontAlt = frontAlt;
        this.backAlt = "back-face";
        this.frontClass = "front-face";
        this.backClass = "back-face";
    }

    flip() {
        this.isFlipped = !this.isFlipped;
    }
    
}
