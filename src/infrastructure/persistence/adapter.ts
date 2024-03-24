/* eslint-disable @typescript-eslint/no-unused-vars */
import { OrderAllocation } from "../../domain/models/order";
import { OrderPersistence } from "../../domain/ports/orderPersistence";
import { Repository } from "typeorm";
import { OrderAllocationEntity } from "./entity";
import CustomError from "../../domain/models/error";

export class PersistenceAdapter implements OrderPersistence {
    private readonly repository: Repository<OrderAllocation>;
    
    constructor(repository: Repository<OrderAllocation>) {
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