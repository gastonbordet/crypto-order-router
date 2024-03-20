/* eslint-disable @typescript-eslint/no-unused-vars */
import { BestPairPrice } from "../domain/models/bestPairPrice";
import OrderRouterService from "../domain/ports/OrderRouterService";
import ExchangeClient from "../domain/ports/exchangeClient";

const MOCK_DATA = {
    "asks": [
        [
            61956.0,
            1.90
        ],
        [
            61955.0,
            0.1
        ],
        [
            61954.0,
            0.1
        ],
    ]
};


export default class AppService implements OrderRouterService {
    private readonly client: ExchangeClient;

    constructor(client: ExchangeClient) {
        this.client = client;
    }

    getBestPairPrice(pair: string, amount: number): BestPairPrice {
        const orders = MOCK_DATA["asks"].sort((a, b) => a[0] - b[0]);
        const orderBookAmount = orders.reduce((sum, bid) => sum + bid[1], 0);
        // if (amount > orderBookAmount) get more orders

        let price = 0;
        let amountbuyed = 0;
        let i = 0;
        while (amountbuyed < amount) {
            const amountwanted = orders[i][1] > amount - amountbuyed ? orders[i][1] - amountbuyed : orders[i][1];
            amountbuyed += amountwanted;
            price += amountwanted * orders[i][0];
            i++;
        }
        
        return { pair: pair, amount: amount, price: price };
    }

    async getAvgPrice(pair: string): Promise<string> {
        const avgPrice = await this.client.getPairAvgPrice(pair);
        return `${pair} avg price: ${avgPrice.price}`;
    }
}
