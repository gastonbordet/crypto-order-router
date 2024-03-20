import { PairAvgPrice } from "../models/pairAvgPrice";

interface OrderRouterService {
    getAvgPrice(pair: string): Promise<PairAvgPrice>
}

export default OrderRouterService;
