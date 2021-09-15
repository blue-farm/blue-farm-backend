import { Delivery } from "./delivery";

export interface BasicWholesale {
  date: string,
  name?: string,
  amount?: number,
  pricePerKg?: number,
  isDelivered?: boolean,
  isPaid?: boolean,
  dueDate: string,
  company_id: number,
}

export interface Wholesale extends BasicWholesale {
  id: number,
}

export interface WholesaleWithDelivery extends Wholesale{
  deliveryAmount: number,
  notDeliveryAmount: number,
  delivery:Delivery[]
}