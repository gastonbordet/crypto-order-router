import CustomError from "../domain/models/error";
import { Order } from "../domain/models/order";
import { ORDER_TYPE, PAIRS, SIDES, TIME_IN_FORCE } from "../domain/models/types";
import OrderRouterService from "../domain/ports/OrderRouterService";
import { Request, Response } from "express";

class NewOrderBody implements Order {
    pair: string;
    side: SIDES;
    timeInForce: TIME_IN_FORCE;
    type: ORDER_TYPE;
    price: number;
    quantity: number;

    constructor(pair: string, side: SIDES, timeInForce: TIME_IN_FORCE, price: number, quantity: number) {
        this.type = ORDER_TYPE.LIMIT;
        this.pair = pair;
        this.side = side;
        this.timeInForce = timeInForce;
        this.price = price;
        this.quantity = quantity;
        this.validateSelf = this.validateSelf.bind(this);
    }

    public validateSelf() {
        if (!(this.pair in PAIRS)) throw new CustomError(422, "Pair not supported.");
        if (!(this.side in SIDES)) throw new CustomError(422, "Side not supported.");
        if (!(this.timeInForce in TIME_IN_FORCE)) throw new CustomError(422, "Time in force not supported.");
    }
}

export default class AppController {
    private readonly appService: OrderRouterService;
    
    constructor(appService: OrderRouterService) {
        this.appService = appService;
        this.GetAvgPrice = this.GetAvgPrice.bind(this);
        this.PostOrder = this.PostOrder.bind(this);
    }

    public async GetAvgPrice(req: Request, res: Response) {
        const pair = String(req.query.pair);
        const avgPrice = await this.appService.getAvgPrice(pair);
        res.status(200).send(avgPrice);
    }

    public async PostOrder(req: Request, res: Response) {
        try {
            const newOrderBody = new NewOrderBody(
                req.body.pair,
                this.mapStringToEnum(req.body.side),
                this.mapStringToTimeInForce(req.body.timeInForce),
                req.body.price,
                req.body.quantity
            );
            newOrderBody.validateSelf();

            const orderResponse = await this.appService.createNewOrder(newOrderBody);
            res.status(201).send(orderResponse);
        } catch (error) {
            const err = error as CustomError;
            res.status(err.status || 500).send(err.message);
        }
    }

    private mapStringToEnum(side: string): SIDES {
        if (side === "BUY") {
            return SIDES.BUY;
        } else if (side === "SELL") {
            return SIDES.SELL;
        } else {
            throw new Error("Invalid side");
        }
    }

    private mapStringToTimeInForce(tif: string): TIME_IN_FORCE {
        if (tif === "GTC") {
            return TIME_IN_FORCE.GTC;
        } else if (tif === "IOC") {
            return TIME_IN_FORCE.IOC;
        } else if (tif === "FOK") {
            return TIME_IN_FORCE.FOK;
        } else {
            throw new Error("Invalid side");
        }
    }
}
