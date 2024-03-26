/* eslint-disable @typescript-eslint/no-unused-vars */
import { Order, OrderAllocation, OrderBook } from "../domain/models/order";
import { BestPairPrice } from "../domain/models/bestPairPrice";
import { PairAvgPrice } from "../domain/models/pairAvgPrice";
import OrderRouterService from "../domain/ports/OrderRouterService";
import ExchangeConnector from "../domain/ports/exchangeConnector";
import { OrderPersistence } from "../domain/ports/orderPersistence";
import CustomError from "../domain/models/error";

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
    private readonly exchangeConnector: ExchangeConnector;
    private readonly orderPersistence: OrderPersistence;

    constructor(connector: ExchangeConnector, orderPersistence: OrderPersistence) {
        this.exchangeConnector = connector;
        this.orderPersistence = orderPersistence;
    }
    
    async createNewOrder(order: Order): Promise<OrderAllocation> {
        const orderAllocation = this.orderPersistence.saveOrderAllocation(
            await this.exchangeConnector.postOrder(order)
        );

        return orderAllocation;
    }

    async getBestPairPrice(pair: string, amount: number): Promise<BestPairPrice> {
        let limit = 500;
        let orderBook = await this.exchangeConnector.getOrderBook(pair, limit);
        let orderBookAmount = orderBook.asks.reduce((sum, bid) => sum + bid.quantity, 0);
        
        while(amount > orderBookAmount) {
            limit += 100;
            // Validate binance max limit
            if (limit > 5000) { 
                throw new CustomError(400, "Max amount exceeded.");
            }
            orderBook = await this.exchangeConnector.getOrderBook(pair, limit);
            orderBookAmount = orderBook.asks.reduce((sum, bid) => sum + bid.quantity, 0);
        }  
        
        const orders = orderBook.asks.sort((a, b) => a.price - b.price);
        let price = 0;
        let amountbuyed = 0;
        let i = 0;

        while (amountbuyed < amount) {
            const entry = orders[i];
            const amountwanted = entry.quantity > amount - amountbuyed ? amount - amountbuyed : entry.quantity;
            amountbuyed += amountwanted;
            price += amountwanted * entry.price;
            i++;
        }
        
        return { pair: pair, amount: amount, price: price };
    }

    async getAvgPrice(pair: string): Promise<PairAvgPrice> {
        const avgPrice = await this.exchangeConnector.getPairAvgPrice(pair);
        return avgPrice;
    }
}
