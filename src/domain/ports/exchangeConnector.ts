import { Order } from "../models/order";
import { PairAvgPrice } from "../models/pairAvgPrice";

interface ExchangeConnector {
    getPairAvgPrice(pair: string): Promise<PairAvgPrice>
    postOrder(order: Order): Promise<Order>
}

export default ExchangeConnector;