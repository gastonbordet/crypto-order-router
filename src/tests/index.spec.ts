import express from "express";
import request from "supertest";
import { describe } from "@jest/globals";
import { AppController } from "../controller/appController";
import AppService from "../service/appService";
import BinanceConnector from "../infrastructure/restclient/binanceConnector";
import { BinanceConnectorMapper } from "../infrastructure/restclient/mapper";
import { PersistenceAdapter } from "../infrastructure/persistence/adapter";
import { buildRouter } from "../api";
import { mockBinanceNewOrder } from "./mockData";
import { OrderAllocation } from "../domain/models/order";

const mockBinanceClient = ({
  currentAveragePrice: jest.fn(),
  newOrder: jest.fn()
});
const mockOrderAllocationRepository = ({
  save: jest.fn(),
});
const mapper = new BinanceConnectorMapper();
const binanceConnector = new BinanceConnector(mockBinanceClient, mapper);
const persistenceAdapter = new PersistenceAdapter(mockOrderAllocationRepository);
const appService = new AppService(binanceConnector, persistenceAdapter);
const appController = new AppController(appService);
const router = buildRouter(appController);
const app = express();

app.use("/", router);

describe("Crypto order router app tests", () => {
  it("Should return pong", async () => {
    // Act
    const res = await request(app).get("/ping");

    // Assert
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("pong");
  });

  it("Should return avg price for a given trading pair", async () => {
    // Setup
    mockBinanceClient.currentAveragePrice.mockImplementation(() => ({
      mins: 5,
      price: "65000.12",
      closeTime: 100
    }));
    const expectedResult = {
      mins: 5,
      price: 65000.12,
      closeTime: 100
    };

    // Act
    const res = await request(app).get("/avgprice?pair=BTCUSDT");
      
    // Assert
    expect(res.statusCode).toEqual(200); 
    expect(mockBinanceClient.currentAveragePrice).toHaveBeenNthCalledWith(1, "BTCUSDT");
    expect(res.body).toEqual(expectedResult);
  });

  it("Should generate an order and persist in database", async () => {
    // Setup
    mockBinanceClient.newOrder.mockImplementation(() => mockBinanceNewOrder);
    mockOrderAllocationRepository.save.mockImplementation((orderAllocation: OrderAllocation) => orderAllocation);
    

    // Act
    const res = await request(app)
      .post("/orders")
      .send({
        "pair": "BTCUSDT",
        "side": "BUY",
        "timeInForce": "FOK",
        "price": 65000,
        "quantity": 0.1
    })
      .set("Accept", "application/json");
      
    // Assert
    expect(res.statusCode).toEqual(201); 
    expect(mockBinanceClient.newOrder).toHaveBeenCalledTimes(1);
    expect(mockOrderAllocationRepository.save).toHaveBeenCalledTimes(1);
    expect(res.body.orderId).toEqual(String(mockBinanceNewOrder.orderId));
  });
});