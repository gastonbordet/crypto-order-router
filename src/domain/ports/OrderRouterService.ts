interface OrderRouterService {
    getAvgPrice(pair: string): Promise<string>
}

export default OrderRouterService;
