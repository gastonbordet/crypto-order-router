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

interface OrderBook {
    lastUpdateId: number;
    bids: Entry[];
    asks: Entry[];
}

export { Order, OrderAllocation, OrderBook, Entry };