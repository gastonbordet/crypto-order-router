import { Order } from "../domain/models/order";
import { PairAvgPrice } from "../domain/models/pairAvgPrice";
import OrderRouterService from "../domain/ports/OrderRouterService";
import ExchangeClient from "../domain/ports/exchangeClient";

export default class AppService implements OrderRouterService {
    private readonly client: ExchangeClient;

    constructor(client: ExchangeClient) {
        this.client = client;
    }
    async createNewOrder(order: Order): Promise<Order> {
        const newOrder = await this.client.postOrder(order);

        return newOrder;
    }

    async getAvgPrice(pair: string): Promise<PairAvgPrice> {
        const avgPrice = await this.client.getPairAvgPrice(pair);
        return avgPrice;
    }
}
