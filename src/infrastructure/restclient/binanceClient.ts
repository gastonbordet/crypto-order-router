/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderType, Side } from "@binance/connector-typescript";
import { Spot } from "@binance/connector-typescript";

interface BinanceRestClient {
    currentAveragePrice(symbol: string): Promise<any>;
    newOrder(symbol: string, side: Side, type: OrderType, options?: any): Promise<any>;

}

class BinanceRestClientImpl implements BinanceRestClient {
    private readonly client;

    constructor(client: Spot) {
        this.client = client;
        this.currentAveragePrice = this.currentAveragePrice.bind(this);
        this.newOrder = this.newOrder.bind(this);
    }
    
    currentAveragePrice(symbol: string): Promise<any> {
        return this.client.currentAveragePrice(symbol);
    }

    newOrder(symbol: string, side: Side, type: OrderType, options?: any): Promise<any> {
        return this.client.newOrder(symbol, side, type, options);
    }
}

export { BinanceRestClient, BinanceRestClientImpl };