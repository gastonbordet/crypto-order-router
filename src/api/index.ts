import express, { Request, Response } from "express";
import { OrderRouterController } from "../controller/appController";

export const buildRouter = (appController: OrderRouterController): express.Router => {
    const router = express.Router();
    router.use(express.json());
    
    router.get("/ping", (_: Request, res: Response) => { 
        res.status(200).send("pong");
    }); 
    
    router.get("/avgprice", appController.getAvgPrice);
    router.get("/bestprice", appController.getBestPairPrice);
    router.post("/orders", appController.postOrder);

    return router;
};
