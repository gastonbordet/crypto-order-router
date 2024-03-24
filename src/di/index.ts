import { AppController } from "../controller/appController";
import AppService from "../service/appService";
import BinanceClient from "../infrastructure/restclient/binanceConnector";
import { BinanceConnectorMapper } from "../infrastructure/restclient/mapper";
import { Spot } from "@binance/connector-typescript";
import dotenv from "dotenv";
import { PersistenceAdapter } from "../infrastructure/persistence/adapter";
import { initDataSource } from "../infrastructure/persistence/dataSource";
import { OrderAllocationEntity } from "../infrastructure/persistence/entity";
dotenv.config();

const dataSource = initDataSource(
    String(process.env.DB_HOST),
    Number(process.env.DB_PORT),
    String(process.env.POSTGRES_USER),
    String(process.env.POSTGRES_PASSWORD),
    String(process.env.POSTGRES_DB)
);
const orderRepository = dataSource.getRepository(OrderAllocationEntity);
const persistenceAdapter = new PersistenceAdapter(orderRepository);
const binanceClient = new Spot(
    process.env.BINANCE_API_KEY || "", 
    process.env.BINANCE_SECRET_KEY || ""
);
const binanceConnectorMapper = new BinanceConnectorMapper();
const binanceConnector = new BinanceClient(binanceClient, binanceConnectorMapper);
const appService = new AppService(binanceConnector, persistenceAdapter);
const appController = new AppController(appService);

export { appController, appService, persistenceAdapter };