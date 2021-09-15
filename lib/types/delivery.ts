
export interface BasicDelivery {
  date: string,
  amount: number,
  pricePerKg: number,
  isDelivered: boolean,
  isPaid: boolean,
  deliveryDate: string,
  wholesale_id: number,
}

export interface Delivery extends BasicDelivery {
  id: number,
}