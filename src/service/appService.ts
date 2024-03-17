import { OrderRouterService } from "../domain/ports/OrderRouterService";

class AppService implements OrderRouterService {
    constructor() {}

    getAvgPrice(pair: string): string {
        return `${pair} avg price: 124`;
    }
}

export { AppService }