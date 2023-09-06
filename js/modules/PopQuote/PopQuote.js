import data from "./data.json";

export default class Quotes {
    rootEl = null;
    quotes = data.quotes;
    currentQuote = null;
    constructor() {
        this.rootEl = document.querySelector("[data-pop-quote]");
    }

    init() {
        if (this.rootEl) {
            const random = Math.floor(Math.random() * this.quotes.length);
            this.currentQuote = this.quotes[random];
            this.rootEl.innerHTML = this.currentQuote;
            console.log("module: PopQuote: init");
        }
    }
}
