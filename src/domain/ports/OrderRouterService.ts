import { Order, OrderAllocation } from "../models/order";
import { BestPairPrice } from "../models/bestPairPrice";
import { PairAvgPrice } from "../models/pairAvgPrice";

interface OrderRouterService {
    getAvgPrice(pair: string): Promise<PairAvgPrice>
    createNewOrder(order: Order): Promise<OrderAllocation>
    getBestPairPrice(pair: string, amount: number): Promise<BestPairPrice>
}

export default OrderRouterService;
