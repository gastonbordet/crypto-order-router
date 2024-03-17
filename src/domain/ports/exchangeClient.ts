import { PairAvgPrice } from "../models/PairAvgPrice";

interface ExchangeClient {
    getPairAvgPrice(pair: string): Promise<PairAvgPrice>
}

export default ExchangeClient;