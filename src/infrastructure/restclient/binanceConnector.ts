import { Order, OrderAllocation } from "../../domain/models/order";
import { PairAvgPrice } from "../../domain/models/pairAvgPrice";
import ExchangeConnector from "../../domain/ports/exchangeConnector";
import { Spot } from "@binance/connector-typescript";
import CustomError from "../../domain/models/error";
import { ExchangeConnectorMapper } from "./mapper";

export default class BinanceConnector implements ExchangeConnector {
    private readonly binanceClient;
    private readonly mapper;

    constructor(binanceClient: Spot, mapper: ExchangeConnectorMapper, ) {
        this.binanceClient = binanceClient;
        this.mapper = mapper;
        this.getPairAvgPrice = this.getPairAvgPrice.bind(this);
        this.postOrder = this.postOrder.bind(this);
    }

    async postOrder(order: Order): Promise<OrderAllocation> {
        try {
            const binanceNewOrder = await this.binanceClient.newOrder(
                order.pair,
                this.mapper.convertToExchangeSide(order.side),
                this.mapper.convertToExchangeOrderType(order.type),
                {
                    timeInForce: this.mapper.convertToExchangeTimeInForce(order.timeInForce),
                    quantity: order.quantity,
                    price: order.price,
                    recvWindow: 5000,
                }
            );
    
            return this.mapper.convertToOrderAllocationFromExchangeNewOrderResponse(binanceNewOrder);
        } catch (error) {
            throw new CustomError(400, `Error on exchange connector: ${String(error)}`);
        }
    }

    async getPairAvgPrice(pair: string): Promise<PairAvgPrice> {
        const binanceAvgPrice = await this.binanceClient.currentAveragePrice(pair);

        return new PairAvgPrice(
            binanceAvgPrice.mins,
            binanceAvgPrice.price,
            binanceAvgPrice.closeTime
        );
    }
}