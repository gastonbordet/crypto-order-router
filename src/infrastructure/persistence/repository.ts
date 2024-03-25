import { OrderAllocation } from "../../domain/models/order";
import { OrderAllocationEntity } from "./entity";
import { Repository } from "typeorm";


interface OrderAllocationRepository {
    save(order: OrderAllocationEntity): Promise<OrderAllocationEntity>
}

class OrderAllocationRepositoryImpl implements OrderAllocationRepository {
    private readonly ormRepository;
    
    constructor(repository: Repository<OrderAllocation>) {
        this.ormRepository = repository;
        this.save = this.save.bind(this);
    }

    save(order: OrderAllocationEntity): Promise<OrderAllocationEntity> {
        return this.ormRepository.save(order);
    }
}

export { OrderAllocationRepository, OrderAllocationRepositoryImpl };