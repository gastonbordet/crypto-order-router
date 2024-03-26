import { PAIRS, SIDES } from "./types";

class BestPairPrice {
    pair: PAIRS;
    amount: number;
    price: number;

    constructor(pair: PAIRS, amount: number, price: number) {
        this.pair = pair;
        this.amount = amount;
        this.price = price;
    }

    public calculateFeeAndSpread(side: SIDES, fee: number, spread: number) {
        if (side === SIDES.BUY) {
            this.price += this.price * spread / 100;
        } else if (side === SIDES.SELL) {
            this.price -= this.price * spread / 100;
        }

        this.price += this.price * fee / 100; 
    }
}

export { BestPairPrice };
