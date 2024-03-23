import { Order } from "../domain/models/order";
import { PairAvgPrice } from "../domain/models/pairAvgPrice";
import OrderRouterService from "../domain/ports/OrderRouterService";
import ExchangeConnector from "../domain/ports/exchangeConnector";

export default class AppService implements OrderRouterService {
    private readonly exchangeConnector: ExchangeConnector;

    constructor(connector: ExchangeConnector) {
        this.exchangeConnector = connector;
    }
    async createNewOrder(order: Order): Promise<Order> {
        const newOrder = await this.exchangeConnector.postOrder(order);

        return newOrder;
    }

    async getAvgPrice(pair: string): Promise<PairAvgPrice> {
        const avgPrice = await this.exchangeConnector.getPairAvgPrice(pair);
        return avgPrice;
    }
}
