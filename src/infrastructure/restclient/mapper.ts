/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderStatus, OrderType, Side, TimeInForce } from "@binance/connector-typescript";
import { ORDER_STATUS, ORDER_TYPE, SIDES, TIME_IN_FORCE } from "../../domain/models/types";
import { OrderAllocation, OrderBook } from "../../domain/models/order";

interface ExchangeConnectorMapper {
    convertToExchangeSide(side: SIDES): Side
    convertToExchangeOrderType(type: ORDER_TYPE): OrderType
    convertToExchangeTimeInForce(timeInForce: TIME_IN_FORCE): TimeInForce
    convertFromExchangeTimeInForce(timeInForce: TimeInForce): TIME_IN_FORCE
    convertFromExchangeOrderStatus(orderStatus: OrderStatus): ORDER_STATUS
    convertFromExchangeOrderType(type: OrderType): ORDER_TYPE
    convertFromExchangeSide(side: Side): SIDES
    convertToOrderAllocationFromExchangeNewOrderResponse(newOrderResponse: any): OrderAllocation
    convertFromExchangeOrderBook(orderBook: any): OrderBook
}

class BinanceConnectorMapper implements ExchangeConnectorMapper {
    constructor() {
        this.convertToExchangeSide = this.convertToExchangeSide.bind(this);
        this.convertToExchangeOrderType = this.convertToExchangeOrderType.bind(this);
        this.convertToExchangeTimeInForce = this.convertToExchangeTimeInForce.bind(this);
        this.convertFromExchangeTimeInForce = this.convertFromExchangeTimeInForce.bind(this);
        this.convertFromExchangeOrderStatus = this.convertFromExchangeOrderStatus.bind(this);
        this.convertFromExchangeOrderType = this.convertFromExchangeOrderType.bind(this);
        this.convertFromExchangeSide = this.convertFromExchangeSide.bind(this);
        this.convertToOrderAllocationFromExchangeNewOrderResponse = this.convertToOrderAllocationFromExchangeNewOrderResponse.bind(this);
        this.convertFromExchangeOrderBook = this.convertFromExchangeOrderBook.bind(this);
    }

    convertFromExchangeOrderBook(orderBook: any): OrderBook {
        return new OrderBook(
            orderBook.lastUpdateId,
            orderBook.bids.map((entry: string[]) => ({price: parseFloat(entry[0]), quantity: parseFloat(entry[1])})),
            orderBook.asks.map((entry: string[]) => ({price: parseFloat(entry[0]), quantity: parseFloat(entry[1])})),
        );
    }

    convertToExchangeSide(side: SIDES): Side {
        switch (side) {
            case SIDES.SELL:
                return Side.SELL;
            case SIDES.BUY:
                return Side.BUY;
            default:
                throw new Error(`Invalid side: ${side}`);
        }
    }
    
    convertToExchangeOrderType(type: ORDER_TYPE): OrderType {
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
    
    convertToExchangeTimeInForce(timeInForce: TIME_IN_FORCE): TimeInForce {
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

    convertFromExchangeTimeInForce(timeInForce: TimeInForce): TIME_IN_FORCE {
        switch (timeInForce) {
            case TimeInForce.GTC:
                return TIME_IN_FORCE.GTC;
            case TimeInForce.IOC:
                return TIME_IN_FORCE.IOC;
            case TimeInForce.FOK:
                return TIME_IN_FORCE.FOK;
            default:
                throw new Error(`Invalid time in force: ${timeInForce}`);
        }
    }

    convertFromExchangeOrderStatus(orderStatus: OrderStatus): ORDER_STATUS {
        switch (orderStatus) {
            case OrderStatus.NEW:
                return ORDER_STATUS.NEW;
            case OrderStatus.PARTIALLY_FILLED:
                return ORDER_STATUS.PARTIALLY_FILLED;
            case OrderStatus.FILLED:
                return ORDER_STATUS.FILLED;
            case OrderStatus.CANCELED:
                return ORDER_STATUS.CANCELED;
            case OrderStatus.PENDING_CANCEL:
                return ORDER_STATUS.PENDING_CANCEL;
            case OrderStatus.REJECTED:
                return ORDER_STATUS.REJECTED;
            case OrderStatus.EXPIRED:
                return ORDER_STATUS.EXPIRED;
            case OrderStatus.EXPIRED_IN_MATCH:
                return ORDER_STATUS.EXPIRED_IN_MATCH;
            default:
                throw new Error(`Invalid order status: ${orderStatus}`);
        }
    }

    convertFromExchangeOrderType(type: OrderType): ORDER_TYPE {
        switch (type) {
            case OrderType.LIMIT:
                return ORDER_TYPE.LIMIT;
            case OrderType.MARKET:
                return ORDER_TYPE.MARKET;
            case OrderType.STOP_LOSS:
                return ORDER_TYPE.STOP_LOSS;
            case OrderType.STOP_LOSS_LIMIT:
                return ORDER_TYPE.STOP_LOSS_LIMIT;   
            case OrderType.TAKE_PROFIT:
                return ORDER_TYPE.TAKE_PROFIT; 
            case OrderType.TAKE_PROFIT_LIMIT:
                return ORDER_TYPE.TAKE_PROFIT_LIMIT; 
            case OrderType.LIMIT_MAKER:
                return ORDER_TYPE.LIMIT_MAKER; 
            default:
                throw new Error(`Invalid order type: ${type}`);
        }
    }

    convertFromExchangeSide(side: Side): SIDES {
        switch (side) {
            case Side.SELL:
                return SIDES.SELL;
            case Side.BUY:
                return SIDES.BUY;
            default:
                throw new Error(`Invalid side: ${side}`);
        }
    }
    
    convertToOrderAllocationFromExchangeNewOrderResponse(newOrderResponse: any): OrderAllocation {
        return {
            pair: String(newOrderResponse.symbol ?? ""),
            orderId: String(newOrderResponse.orderId ?? ""),
            clientOrderId: String(newOrderResponse.clientOrderId ?? ""),
            transactTime: Number(newOrderResponse.transactTime ?? null),
            price: String(newOrderResponse.price ?? ""),
            originalQuantity: String(newOrderResponse.origQty ?? ""),
            executedQuantity: String(newOrderResponse.executedQty ?? ""),
            status: this.convertFromExchangeOrderStatus(newOrderResponse.status ?? ""),
            timeInForce: this.convertFromExchangeTimeInForce(newOrderResponse.timeInForce ?? ""),
            type: this.convertFromExchangeOrderType(newOrderResponse.type ?? ""),
            side: this.convertFromExchangeSide(newOrderResponse.side ?? ""),
            workingTime: Number(newOrderResponse.workingTime ?? null),
        };
    }
}

export { ExchangeConnectorMapper, BinanceConnectorMapper };