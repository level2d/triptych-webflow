import data from "./data.json";

export default class Quotes {
    $target = null;
    quotes = data.quotes;
    currentQuote = null;
    constructor(app) {
        this.app = app;
        this.$target = this.app.core.dom.popQuote;
    }

    init() {
        if (this.$target.length) {
            const random = Math.floor(Math.random() * this.quotes.length);
            this.currentQuote = this.quotes[random];
            this.$target.html(this.currentQuote);
            console.log("Module: PopQuote: init");
        }
    }
}
