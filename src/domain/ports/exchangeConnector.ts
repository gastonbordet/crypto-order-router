import { Order, OrderAllocation, OrderBook } from "../models/order";
import { PairAvgPrice } from "../models/pairAvgPrice";

interface ExchangeConnector {
    getPairAvgPrice(pair: string): Promise<PairAvgPrice>
    postOrder(order: Order): Promise<OrderAllocation>
    getOrderBook(pair: string, limit: number): Promise<OrderBook>
}

export default ExchangeConnector;