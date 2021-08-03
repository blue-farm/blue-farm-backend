import { Wholesale } from "./wholesale";

export interface BasicCompany {
  name: string,
  phone?: string,
  tell?: string,
}

export interface Company extends BasicCompany {
  id: number,
}

export interface Companies extends BasicCompany {
  id: number,
  name: string,
  totalAmount: number,
  notShippedAmount: number,
  wholesales:Wholesale[];
}