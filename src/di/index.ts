import AppController from "../controller/appController";
import AppService from "../service/appService";
import BinanceClient from "../infrastructure/restclient/binanceClient";

const binanceClient = new BinanceClient();
const appService = new AppService(binanceClient);
const appController = new AppController(appService);

export { appController };