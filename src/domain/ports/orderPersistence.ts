import { OrderAllocation, PriceConfiguration } from "../models/order";

export interface OrderPersistence {
    saveOrderAllocation(order: OrderAllocation): Promise<OrderAllocation>
    getPriceConfiguration(): Promise<PriceConfiguration>
}