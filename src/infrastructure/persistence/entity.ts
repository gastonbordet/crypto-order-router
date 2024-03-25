/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { OrderAllocation } from "../../domain/models/order";
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

    constructor(orderAllocation: OrderAllocation) {
        this.pair = orderAllocation.pair;
        this.orderId = orderAllocation.orderId;
        this.clientOrderId = orderAllocation.clientOrderId;
        this.transactTime = orderAllocation.transactTime;
        this.price = orderAllocation.price;
        this.originalQuantity = orderAllocation.originalQuantity;
        this.executedQuantity = orderAllocation.executedQuantity;
        this.status = orderAllocation.status;
        this.timeInForce = orderAllocation.timeInForce;
        this.type = orderAllocation.type;
        this.side = orderAllocation.side;
        this.workingTime = orderAllocation.workingTime;
    }
}
