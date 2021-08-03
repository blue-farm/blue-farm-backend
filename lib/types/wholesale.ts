
export interface BasicWholesale {
  date: string,
  name?: string,
  amount: number,
  pricePerKg: number,
  isDelivered: boolean,
  isPaid: boolean,
  dueDate: string,
  company_id: number,
}

export interface Wholesale extends BasicWholesale {
  id: number,
}