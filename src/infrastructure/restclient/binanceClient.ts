import { Order } from "../../domain/models/order";
import { PairAvgPrice } from "../../domain/models/pairAvgPrice";
import ExchangeClient from "../../domain/ports/exchangeClient";
import axios from "axios";
import dotenv from "dotenv";
import crypto from "crypto";

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
        this.getPairAvgPrice = this.getPairAvgPrice.bind(this);
        this.postOrder = this.postOrder.bind(this);
    }
    
    async postOrder(order: Order): Promise<Order> {
        const params: Record<string, string> = {
            "symbol": order.pair,
            "side": order.side,
            "type": order.type,
            "timeInForce": order.timeInForce,
            "quantity": String(order.quantity),
            "price": String(order.price),
            "timestamp": String(Date.now())
        };
        let payload = this.constructPayload(params);
        const encodePayload = this.encodePayload(payload);
        const signature = this.signPayload(encodePayload, process.env.BINANCE_SECRET_KEY || ""); // You need to provide the private key
        const encodedSignature = this.urlEncode(signature);
        payload += `&signature=${encodedSignature}`; 
        const url = `${this.HOST}/api/v3/order/test?${payload}`;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data } = await axios.post(url);

        return order;
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

    constructPayload(params: Record<string, string>): string {
        return Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join("&");
    }

    encodePayload(payload: string): string {
        return Buffer.from(payload, "ascii").toString("base64");
    }

    signPayload(payload: string, privateKey: string): string {
        try {
            const signer = crypto.createSign("RSA-SHA256");
            signer.update(payload, "utf8");
            const b64_publicKey = privateKey.replace(/\\n/gm, "\n");
            return signer.sign(b64_publicKey, "base64");
        } catch(error) {
            return "";
        }
    }

    urlEncode(signature: string): string {
        return encodeURIComponent(signature);
    }
    
}