import { OrderAllocation } from "../../domain/models/order";
import { OrderAllocationEntity, PriceConfigurationEntity } from "./entity";
import { Repository } from "typeorm";


interface OrderAllocationRepository {
    save(order: OrderAllocationEntity): Promise<OrderAllocationEntity>
}

interface PriceConfigurationRepository {
    get(): Promise<PriceConfigurationEntity>
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

class PriceConfigurationRepositoryImpl implements PriceConfigurationRepository {
    private readonly ormRepository;

    constructor(repository: Repository<PriceConfigurationEntity>) {
        this.ormRepository = repository;
        this.get = this.get.bind(this);
    }

    async get(): Promise<PriceConfigurationEntity> {
        return this.ormRepository.findOneByOrFail({
            id: 1
        });
    }
}

export { OrderAllocationRepository, OrderAllocationRepositoryImpl, PriceConfigurationRepositoryImpl, PriceConfigurationRepository };