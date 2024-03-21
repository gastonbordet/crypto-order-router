import { Order } from "../models/order";
import { PairAvgPrice } from "../models/pairAvgPrice";

interface ExchangeClient {
    getPairAvgPrice(pair: string): Promise<PairAvgPrice>
    postOrder(order: Order): Promise<Order>
}

export default ExchangeClient;