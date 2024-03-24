import { Order, OrderAllocation } from "../domain/models/order";
import { PairAvgPrice } from "../domain/models/pairAvgPrice";
import OrderRouterService from "../domain/ports/OrderRouterService";
import ExchangeConnector from "../domain/ports/exchangeConnector";

export default class AppService implements OrderRouterService {
    private readonly exchangeConnector: ExchangeConnector;

    constructor(connector: ExchangeConnector) {
        this.exchangeConnector = connector;
    }
    
    async createNewOrder(order: Order): Promise<OrderAllocation> {
        const orderAllocation = await this.exchangeConnector.postOrder(order);

        return orderAllocation;
    }

    async getAvgPrice(pair: string): Promise<PairAvgPrice> {
        const avgPrice = await this.exchangeConnector.getPairAvgPrice(pair);
        return avgPrice;
    }
}
