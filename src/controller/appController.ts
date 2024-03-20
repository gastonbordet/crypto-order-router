import OrderRouterService from "../domain/ports/OrderRouterService";
import { Request, Response } from "express";

export default class AppController {
    private readonly appService: OrderRouterService;
    
    constructor(appService: OrderRouterService) {
        this.appService = appService;
        this.GetAvgPrice = this.GetAvgPrice.bind(this);
        this.GetBestPairPrice = this.GetBestPairPrice.bind(this);
    }

    public async GetAvgPrice(req: Request, res: Response) {
        const pair = String(req.query.pair);
        const avgPrice = await this.appService.getAvgPrice(pair);
        res.status(200).send(avgPrice);
    }

    public GetBestPairPrice(req: Request, res: Response) {
        const pair = String(req.query.pair);
        const amount = Number(req.query.amount);
        const bestPairPrice = this.appService.getBestPairPrice(pair, amount);

        res.status(200).send(JSON.stringify(bestPairPrice));
    }
}
