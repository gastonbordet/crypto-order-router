import AppController from "../controller/appController";
import AppService from "../service/appService";
import BinanceClient from "../infrastructure/restclient/binanceConnector";
import { BinanceConnectorMapper } from "../infrastructure/restclient/mapper";
import { Spot } from "@binance/connector-typescript";
import dotenv from "dotenv";
dotenv.config();


const binanceClient = new Spot(
    process.env.BINANCE_API_KEY || "", 
    process.env.BINANCE_SECRET_KEY || ""
);
const binanceConnectorMapper = new BinanceConnectorMapper();
const binanceConnector = new BinanceClient(binanceClient, binanceConnectorMapper);
const appService = new AppService(binanceConnector);
const appController = new AppController(appService);

export { appController };