import { PairAvgPrice } from "../models/pairAvgPrice";

interface ExchangeClient {
    getPairAvgPrice(pair: string): Promise<PairAvgPrice>
    
}

export default ExchangeClient;