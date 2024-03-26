// TODO persist as entities in DB for configuration. 
enum PAIRS {
    USDTETH = "USDTETH",
    USDTBTC = "USDTBTC",
    USDCAAVE = "USDCAAVE",
    ETHUSDT = "ETHUSDT",
    BTCUSDT = "BTCUSDT",
    AAVEUSDC = "AAVEUSDC"
}

enum SIDES {
    SELL = "SELL",
    BUY = "BUY"
}

enum ORDER_TYPE {
    LIMIT = "LIMIT",
    MARKET = "MARKET",
    STOP_LOSS = "STOP_LOSS",
    STOP_LOSS_LIMIT = "STOP_LOSS_LIMIT",
    TAKE_PROFIT = "TAKE_PROFIT",
    TAKE_PROFIT_LIMIT = "TAKE_PROFIT_LIMIT",
    LIMIT_MAKER = "LIMIT_MAKER"
}

enum TIME_IN_FORCE {
    GTC = "GTC",
    IOC = "IOC",
    FOK = "FOK"
}

enum ORDER_STATUS {
    NEW = "NEW",
    PARTIALLY_FILLED = "PARTIALLY_FILLED",
    FILLED = "FILLED",
    CANCELED = "CANCELED",
    PENDING_CANCEL = "PENDING_CANCEL",
    REJECTED = "REJECTED",
    EXPIRED = "EXPIRED",
    EXPIRED_IN_MATCH = "EXPIRED_IN_MATCH"
}

const mapStringToEnum = (side: string): SIDES => {
    return SIDES[side as keyof typeof SIDES];
};

const mapStringToPair = (pair: string): PAIRS => {
    return PAIRS[pair as keyof typeof PAIRS];
};

const mapStringToTimeInForce = (tif: string): TIME_IN_FORCE => {
    return TIME_IN_FORCE[tif as keyof typeof TIME_IN_FORCE];
};

export { 
    PAIRS, 
    SIDES, 
    TIME_IN_FORCE, 
    ORDER_TYPE, 
    ORDER_STATUS,
    mapStringToEnum,
    mapStringToPair,
    mapStringToTimeInForce
};
