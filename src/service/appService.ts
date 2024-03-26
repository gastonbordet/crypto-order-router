/* eslint-disable @typescript-eslint/no-unused-vars */
import { Order, OrderAllocation, OrderBook } from "../domain/models/order";
import { BestPairPrice } from "../domain/models/bestPairPrice";
import { PairAvgPrice } from "../domain/models/pairAvgPrice";
import OrderRouterService from "../domain/ports/OrderRouterService";
import ExchangeConnector from "../domain/ports/exchangeConnector";
import { OrderPersistence } from "../domain/ports/orderPersistence";
import CustomError from "../domain/models/error";
import { PAIRS, SIDES } from "../domain/models/types";

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

    async getBestPairPrice(pair: PAIRS, amount: number, side: SIDES, limitOrders: number): Promise<BestPairPrice> {
        if (limitOrders > 5000) { 
            throw new CustomError(400, "Max amount exceeded.");
        }
        const orderBook = await this.exchangeConnector.getOrderBook(pair, limitOrders);
        const orderBookAmount = orderBook.getEntries(side).reduce((sum, bid) => sum + bid.quantity, 0);
                
        if (amount > orderBookAmount) {
            throw new CustomError(400, `Please increase your current ${limitOrders} order amount limit.`);
        }

        const orders = orderBook.getEntries(side).sort((a, b) => a.price - b.price);
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

    async getAvgPrice(pair: PAIRS): Promise<PairAvgPrice> {
        const avgPrice = await this.exchangeConnector.getPairAvgPrice(pair);
        return avgPrice;
    }
}
