import CustomError from "../domain/models/error";
import { Order } from "../domain/models/order";
import { ORDER_TYPE, PAIRS, SIDES, TIME_IN_FORCE } from "../domain/models/types";
import OrderRouterService from "../domain/ports/OrderRouterService";
import { Request, Response } from "express";

export interface OrderRouterController {
    getAvgPrice(req: Request, res: Response): void
    postOrder(req: Request, res: Response): void
    getBestPairPrice(req: Request, res: Response): void
}

class NewOrderBody implements Order {
    pair: PAIRS;
    side: SIDES;
    timeInForce: TIME_IN_FORCE;
    type: ORDER_TYPE;
    price: number;
    quantity: number;

    constructor(pair: PAIRS, side: SIDES, timeInForce: TIME_IN_FORCE, price: number, quantity: number) {
        this.type = ORDER_TYPE.LIMIT;
        this.pair = pair;
        this.side = side;
        this.timeInForce = timeInForce;
        this.price = price;
        this.quantity = quantity;
        this.validateSelf = this.validateSelf.bind(this);
    }

    public validateSelf() {
        // TODO generate validator and validations 
        if (!(this.pair in PAIRS)) throw new CustomError(422, "Pair not supported.");
        if (!(this.side in SIDES)) throw new CustomError(422, "Side not supported.");
        if (!(this.timeInForce in TIME_IN_FORCE)) throw new CustomError(422, "Time in force not supported.");
    }
}

export class AppController implements OrderRouterController {
    private readonly appService: OrderRouterService;
    
    constructor(appService: OrderRouterService) {
        this.appService = appService;
        this.getAvgPrice = this.getAvgPrice.bind(this);
        this.postOrder = this.postOrder.bind(this);
        this.getBestPairPrice = this.getBestPairPrice.bind(this);
    }

    public async getAvgPrice(req: Request, res: Response) {
        try {
            const pair = String(req.query.pair).toUpperCase();
            if (!(pair in PAIRS)) throw new CustomError(422, "Pair not supported.");

            const avgPrice = await this.appService.getAvgPrice(this.mapStringToPair(pair));
            res.status(200).send(avgPrice);
        } catch (error) {
            const err = error as CustomError;
            res.status(err.status || 500).send(err.message);
        }
    }

    public async getBestPairPrice(req: Request, res: Response) {
        try {
            const side = String(req.query.side).toUpperCase();
            const pair = String(req.query.pair).toUpperCase();
            const amount = Number(req.query.amount);
            const limitOrders = Number(req.query.limitOrders ?? 300);
            if (!(pair in PAIRS)) throw new CustomError(422, "Pair not supported.");
            if (!(side in SIDES)) throw new CustomError(422, "Side not supported.");

            const bestPairPrice = await this.appService.getBestPairPrice(
                this.mapStringToPair(pair), 
                amount, 
                this.mapStringToEnum(side),
                limitOrders
            );

            res.status(200).send(bestPairPrice);
        } catch (error) {
            const err = error as CustomError;
            res.status(err.status || 500).send(err.message);
        }
    }

    public async postOrder(req: Request, res: Response) {
        try {
            const newOrderBody = new NewOrderBody(
                this.mapStringToPair(String(req.body.pair).toUpperCase()),
                this.mapStringToEnum(String(req.body.side).toUpperCase()),
                this.mapStringToTimeInForce(String(req.body.timeInForce).toUpperCase()),
                req.body.price,
                req.body.quantity
            );
            newOrderBody.validateSelf();

            const orderAllocation = await this.appService.createNewOrder(newOrderBody);
            res.status(201).send(orderAllocation);
        } catch (error) {
            const err = error as CustomError;
            res.status(err.status || 500).send(err.message);
        }
    }

    private mapStringToEnum(side: string): SIDES {
        return SIDES[side as keyof typeof SIDES];
    }

    private mapStringToPair(pair: string): PAIRS {
        return PAIRS[pair as keyof typeof PAIRS];
    }

    private mapStringToTimeInForce(tif: string): TIME_IN_FORCE {
        return TIME_IN_FORCE[tif as keyof typeof TIME_IN_FORCE];
    }
}
