import { AppController, OrderRouterController } from "../controller/appController";
import AppService from "../service/appService";
import BinanceClient from "../infrastructure/restclient/binanceConnector";
import { BinanceConnectorMapper } from "../infrastructure/restclient/mapper";
import { Spot } from "@binance/connector-typescript";
import dotenv from "dotenv";
import { PersistenceAdapter } from "../infrastructure/persistence/adapter";
import AppDataSource from "../infrastructure/persistence/typeOrm.config";
import { OrderAllocationEntity, PriceConfigurationEntity } from "../infrastructure/persistence/entity";
import { OrderAllocationRepositoryImpl, PriceConfigurationRepositoryImpl } from "../infrastructure/persistence/repository";
import { BinanceRestClientImpl } from "../infrastructure/restclient/binanceClient";
import OrderRouterService from "../domain/ports/OrderRouterService";
import { OrderPersistence } from "../domain/ports/orderPersistence";

dotenv.config();

AppDataSource.initialize();

const orderRepository = new OrderAllocationRepositoryImpl(AppDataSource.getRepository(OrderAllocationEntity));
const priceConfigurationRepository = new PriceConfigurationRepositoryImpl(AppDataSource.getRepository(PriceConfigurationEntity));
const binanceClient = new BinanceRestClientImpl(new Spot(
    process.env.BINANCE_API_KEY || "", 
    process.env.BINANCE_SECRET_KEY || ""
));
const binanceConnectorMapper = new BinanceConnectorMapper();
const binanceConnector = new BinanceClient(binanceClient, binanceConnectorMapper);
const persistenceAdapter: OrderPersistence = new PersistenceAdapter(orderRepository, priceConfigurationRepository);
const appService: OrderRouterService = new AppService(binanceConnector, persistenceAdapter);
const appController: OrderRouterController = new AppController(appService);

export { appController, appService, persistenceAdapter };