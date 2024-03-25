/* eslint-disable @typescript-eslint/no-unused-vars */
import { OrderAllocation } from "../../domain/models/order";
import { OrderPersistence } from "../../domain/ports/orderPersistence";
import { OrderAllocationEntity } from "./entity";
import CustomError from "../../domain/models/error";
import { OrderAllocationRepository } from "./repository";

export class PersistenceAdapter implements OrderPersistence {
    private readonly repository: OrderAllocationRepository;
    
    constructor(repository: OrderAllocationRepository) {
        this.repository = repository;
        this.saveOrderAllocation = this.saveOrderAllocation.bind(this);
    }

    public async saveOrderAllocation(order: OrderAllocation): Promise<OrderAllocation> {
        try {
            const orderEntity = await this.repository.save(order as OrderAllocationEntity);

            return orderEntity;
        } catch (error) {
            throw new CustomError(500, `Error in order persistence adapter: ${String(error)}`);
        }
    }
}