/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { OrderAllocation, PriceConfiguration } from "../../domain/models/order";
import { ORDER_STATUS, TIME_IN_FORCE, ORDER_TYPE, SIDES } from "../../domain/models/types";

@Entity()
export class OrderAllocationEntity implements OrderAllocation {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    pair: string;
    @Column()
    orderId: string;
    @Column()
    clientOrderId: string;
    @Column()
    transactTime: number;
    @Column()
    price: string;
    @Column()
    originalQuantity: string;
    @Column()
    executedQuantity: string;
    @Column()
    status: ORDER_STATUS;
    @Column()
    timeInForce: TIME_IN_FORCE;
    @Column()
    type: ORDER_TYPE;
    @Column()
    side: SIDES;
    @Column()
    workingTime: number;
}

@Entity("price_configuration_entity")
export class PriceConfigurationEntity implements PriceConfiguration {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: "float" })
    exchangeFee: number;
    @Column({ type: "float" })
    spread: number;
    @Column({nullable: true})
    deprecated_at: Date;
}