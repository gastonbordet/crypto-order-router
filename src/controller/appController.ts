import OrderRouterService from "../domain/ports/OrderRouterService";
import { Request, Response } from "express";

export default class AppController {
    private readonly appService: OrderRouterService;
    
    constructor(appService: OrderRouterService) {
        this.appService = appService;
        this.GetAvgPrice = this.GetAvgPrice.bind(this);
    }

    public async GetAvgPrice(req: Request, res: Response) {
        const pair = String(req.query.pair);
        const avgPrice = await this.appService.getAvgPrice(pair);
        res.status(200).send(avgPrice);
    }
}
