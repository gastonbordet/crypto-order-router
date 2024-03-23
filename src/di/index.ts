import AppController from "../controller/appController";
import AppService from "../service/appService";
import BinanceClient from "../infrastructure/restclient/binanceConnector";
import { Spot } from "@binance/connector-typescript";
import dotenv from "dotenv";
dotenv.config();


const binanceClient = new Spot(
    process.env.BINANCE_API_KEY || "", 
    process.env.BINANCE_SECRET_KEY || ""
);
const binanceConnector = new BinanceClient(binanceClient);
const appService = new AppService(binanceConnector);
const appController = new AppController(appService);

export { appController };