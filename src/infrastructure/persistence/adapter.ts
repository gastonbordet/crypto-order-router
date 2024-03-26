/* eslint-disable @typescript-eslint/no-unused-vars */
import { OrderAllocation, PriceConfiguration } from "../../domain/models/order";
import { OrderPersistence } from "../../domain/ports/orderPersistence";
import { OrderAllocationEntity } from "./entity";
import CustomError from "../../domain/models/error";
import { OrderAllocationRepository, PriceConfigurationRepository } from "./repository";

export class PersistenceAdapter implements OrderPersistence {
    private readonly orderRepository: OrderAllocationRepository;
    private readonly priceConfigRepository: PriceConfigurationRepository;

    constructor(orderRepository: OrderAllocationRepository, priceConfigRepository: PriceConfigurationRepository) {
        this.orderRepository = orderRepository;
        this.priceConfigRepository = priceConfigRepository;
        this.saveOrderAllocation = this.saveOrderAllocation.bind(this);
    }
    
    public async getPriceConfiguration(): Promise<PriceConfiguration> {
        try {
            const priceConfigEntity = await this.priceConfigRepository.get();

            return priceConfigEntity;
        } catch (error) {
            throw new CustomError(500, `Error in persistence adapter: ${String(error)}`);
        }
    }

    public async saveOrderAllocation(order: OrderAllocation): Promise<OrderAllocation> {
        try {
            const orderEntity = await this.orderRepository.save(order as OrderAllocationEntity);

            return orderEntity;
        } catch (error) {
            throw new CustomError(500, `Error in persistence adapter: ${String(error)}`);
        }
    }
}