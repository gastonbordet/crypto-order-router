import { ORDER_TYPE, SIDES, TIME_IN_FORCE, ORDER_STATUS } from "./types";

interface Order {
    pair: string;
    side: SIDES;
    type: ORDER_TYPE;
    timeInForce: TIME_IN_FORCE;
    price: number;
    quantity: number;
}

interface OrderAllocation {
    pair: string;
    orderId: string;
    clientOrderId: string;
    transactTime: number;
    price: string;
    originalQuantity: string;
    executedQuantity: string;
    status: ORDER_STATUS;
    timeInForce: TIME_IN_FORCE;
    type: ORDER_TYPE;
    side: SIDES;
    workingTime: number;
}

interface Entry {
    price: number
    quantity: number
}

class OrderBook {
    lastUpdateId: number;
    bids: Entry[];
    asks: Entry[];

    constructor(lastUpdateId: number, bids: Entry[], asks: Entry[]) {
        this.lastUpdateId = lastUpdateId;
        this.bids = bids;
        this.asks = asks;
    }

    public getEntries(side: SIDES) {
        switch(side) {
            case SIDES.BUY:
                return this.asks;
            case SIDES.SELL:
                return this.bids;
            default:
                return [];
        }
    }
}

interface PriceConfiguration {
    exchangeFee: number
    spread: number
}

export { Order, OrderAllocation, OrderBook, Entry, PriceConfiguration };