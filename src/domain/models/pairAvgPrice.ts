class PairAvgPrice {
    mins: number; // Avg price interval
    price: number; // Avg price
    closeTime: number; // Last trade time

    constructor(mins: number, price: string, closeTime: number) {
        this.mins = mins;
        this.price = parseFloat(parseFloat(price).toFixed(3));
        this.closeTime = closeTime;
    }
}

export { PairAvgPrice };