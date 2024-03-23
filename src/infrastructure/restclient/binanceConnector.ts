/* eslint-disable @typescript-eslint/no-unused-vars */
import { Order } from "../../domain/models/order";
import { PairAvgPrice } from "../../domain/models/pairAvgPrice";
import ExchangeConnector from "../../domain/ports/exchangeConnector";
import { Spot, Side, OrderType, TimeInForce } from "@binance/connector-typescript";
import { ORDER_TYPE, SIDES, TIME_IN_FORCE } from "../../domain/models/types";
import CustomError from "../../domain/models/error";

export default class BinanceConnector implements ExchangeConnector {
    private readonly binanceClient;

    constructor(binanceClient: Spot) {
        this.binanceClient = binanceClient;
        this.getPairAvgPrice = this.getPairAvgPrice.bind(this);
        this.postOrder = this.postOrder.bind(this);
    }

    async postOrder(order: Order): Promise<Order> {
        try {
            const binanceNewOrder = await this.binanceClient.testNewOrder(
                order.pair,
                this.convertDomainSidesToBinanceSide(order.side),
                this.convertDomainOrderTypesToBinanceOrderType(order.type),
                {
                    timeInForce: this.convertDomainTimeInForToBinanceTimeInForce(order.timeInForce),
                    quantity: order.quantity,
                    price: order.price,
                    recvWindow: 5000,
                }
            );
    
            return order;
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

    private convertDomainSidesToBinanceSide(side: SIDES): Side {
        switch (side) {
            case SIDES.SELL:
                return Side.SELL;
            case SIDES.BUY:
                return Side.BUY;
            default:
                throw new Error(`Invalid side: ${side}`);
        }
    }
    
    private convertDomainOrderTypesToBinanceOrderType(type: ORDER_TYPE): OrderType {
        switch (type) {
            case ORDER_TYPE.LIMIT:
                return OrderType.LIMIT;
            case ORDER_TYPE.MARKET:
                return OrderType.MARKET;
            case ORDER_TYPE.STOP_LOSS:
                return OrderType.STOP_LOSS;
            case ORDER_TYPE.STOP_LOSS_LIMIT:
                return OrderType.STOP_LOSS_LIMIT;   
            case ORDER_TYPE.TAKE_PROFIT:
                return OrderType.TAKE_PROFIT; 
            case ORDER_TYPE.TAKE_PROFIT_LIMIT:
                return OrderType.TAKE_PROFIT_LIMIT; 
            case ORDER_TYPE.LIMIT_MAKER:
                return OrderType.LIMIT_MAKER; 
            default:
                throw new Error(`Invalid order type: ${type}`);
        }
    }
    
    private convertDomainTimeInForToBinanceTimeInForce(timeInForce: TIME_IN_FORCE): TimeInForce {
        switch (timeInForce) {
            case TIME_IN_FORCE.GTC:
                return TimeInForce.GTC;
            case TIME_IN_FORCE.IOC:
                return TimeInForce.IOC;
            case TIME_IN_FORCE.FOK:
                return TimeInForce.FOK;
            default:
                throw new Error(`Invalid time in force: ${timeInForce}`);
        }
    }
    
}