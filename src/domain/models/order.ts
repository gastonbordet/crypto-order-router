interface Order {
    pair: string;
    side: string;
    type: string;
    timeInForce: string;
    price: number;
    quantity: number;
}

export { Order };