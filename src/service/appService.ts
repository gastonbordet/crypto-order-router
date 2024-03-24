import { Order, OrderAllocation } from "../domain/models/order";
import { PairAvgPrice } from "../domain/models/pairAvgPrice";
import OrderRouterService from "../domain/ports/OrderRouterService";
import ExchangeConnector from "../domain/ports/exchangeConnector";
import { OrderPersistence } from "../domain/ports/orderPersistence";

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

    async getAvgPrice(pair: string): Promise<PairAvgPrice> {
        const avgPrice = await this.exchangeConnector.getPairAvgPrice(pair);
        return avgPrice;
    }
}
