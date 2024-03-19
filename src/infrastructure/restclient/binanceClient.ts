import { PairAvgPrice } from "../../domain/models/pairAvgPrice";
import ExchangeClient from "../../domain/ports/exchangeClient";
import axios from "axios";
import dotenv from "dotenv";

interface BinancePairAvgPrice {
    mins: number,
    price: string,
    closeTime: number
}

export default class BinanceClient implements ExchangeClient {
    private readonly HOST: string;

    constructor() {
        dotenv.config();
        this.HOST = process.env.BINANCE_HOST || "";
    }

    async getPairAvgPrice(pair: string): Promise<PairAvgPrice> {
        const url = `${this.HOST}/api/v3/avgPrice?symbol=${pair}`;
        const { data } = await axios.get(url);
        const binanceAvgPrice: BinancePairAvgPrice = data;

        return new PairAvgPrice(
            binanceAvgPrice.mins,
            binanceAvgPrice.price,
            binanceAvgPrice.closeTime
        );
    }
}