import { ORDER_TYPE, SIDES, TIME_IN_FORCE } from "./types";

interface Order {
    pair: string;
    side: SIDES;
    type: ORDER_TYPE;
    timeInForce: TIME_IN_FORCE;
    price: number;
    quantity: number;
}

export { Order };