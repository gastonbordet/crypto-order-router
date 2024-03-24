import { OrderAllocation } from "../models/order";

export interface OrderPersistence {
    saveOrderAllocation(order: OrderAllocation): Promise<OrderAllocation>
}