import { Order, OrderAllocation } from "../models/order";
import { PairAvgPrice } from "../models/pairAvgPrice";

interface OrderRouterService {
    getAvgPrice(pair: string): Promise<PairAvgPrice>
    createNewOrder(order: Order): Promise<OrderAllocation>
}

export default OrderRouterService;
