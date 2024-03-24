import { Order, OrderAllocation } from "../models/order";
import { PairAvgPrice } from "../models/pairAvgPrice";

interface ExchangeConnector {
    getPairAvgPrice(pair: string): Promise<PairAvgPrice>
    postOrder(order: Order): Promise<OrderAllocation>
}

export default ExchangeConnector;