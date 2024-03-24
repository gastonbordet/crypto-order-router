import { OrderStatus, OrderType, Side, TimeInForce } from "@binance/connector-typescript";

export const binanceNewOrder = {
    symbol: "USDTBTC",
    orderId: 123,
    orderListId: 456,
    clientOrderId: "123456",
    transactTime: 12345,
    price: "1.0",
    origQty: "0.5",
    executedQty: "0.3",
    cummulativeQuoteQty: "0.3",
    status: OrderStatus.NEW,
    timeInForce: TimeInForce.FOK,
    type: OrderType.LIMIT,
    side: Side.BUY,
    workingTime: 12345,
    selfTradePreventionMode: null,
    fills: []
};

