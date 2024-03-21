import { Order } from "../models/order";
import { PairAvgPrice } from "../models/pairAvgPrice";

interface OrderRouterService {
    getAvgPrice(pair: string): Promise<PairAvgPrice>
    createNewOrder(order: Order): Promise<Order>
}

export default OrderRouterService;
