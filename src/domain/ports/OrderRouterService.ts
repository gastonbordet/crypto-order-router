import { BestPairPrice } from "../models/bestPairPrice";

interface OrderRouterService {
    getAvgPrice(pair: string): Promise<string>
    getBestPairPrice(pair: string, amount: number): BestPairPrice
}

export default OrderRouterService;
