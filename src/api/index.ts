import { Response } from "express";
import {
    appController
} from '../di';

const router = require('express').Router();


router.get("/ping", (_: Request, res: Response) => { 
    res.status(200).send("pong");
}); 

router.get("/avgprice", appController.GetAvgPrice)

module.exports = router;