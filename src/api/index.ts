import express, { Request, Response } from "express";
import { appController } from "../di";

const router = express.Router();

router.get("/ping", (_: Request, res: Response) => { 
    res.status(200).send("pong");
}); 

router.get("/avgprice", appController.GetAvgPrice);
router.get("/bestprice", appController.GetBestPairPrice);

export default router;