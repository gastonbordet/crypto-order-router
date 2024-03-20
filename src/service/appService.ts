import { PairAvgPrice } from "../domain/models/pairAvgPrice";
import OrderRouterService from "../domain/ports/OrderRouterService";
import ExchangeClient from "../domain/ports/exchangeClient";

export default class AppService implements OrderRouterService {
    private readonly client: ExchangeClient;

    constructor(client: ExchangeClient) {
        this.client = client;
    }

    async getAvgPrice(pair: string): Promise<PairAvgPrice> {
        const avgPrice = await this.client.getPairAvgPrice(pair);
        return avgPrice;
    }
}
