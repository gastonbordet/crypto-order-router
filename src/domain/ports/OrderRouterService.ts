import { Order, OrderAllocation } from "../models/order";
import { BestPairPrice } from "../models/bestPairPrice";
import { PairAvgPrice } from "../models/pairAvgPrice";
import { PAIRS, SIDES } from "../models/types";

interface OrderRouterService {
    getAvgPrice(pair: PAIRS): Promise<PairAvgPrice>
    createNewOrder(order: Order): Promise<OrderAllocation>
    getBestPairPrice(
        pair: PAIRS, 
        amount: number, 
        side: SIDES, 
        limitOrders: number,
        customFee?: number,
        customSpread?: number
    ): Promise<BestPairPrice>
}

export default OrderRouterService;
