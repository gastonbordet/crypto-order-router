import { OrderRouterService } from "../domain/ports/OrderRouterService";

export default class AppService implements OrderRouterService {
    constructor() {}

    getAvgPrice(pair: string): string {
        return `${pair} avg price: 124`;
    }
}
