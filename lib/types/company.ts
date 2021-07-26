
export interface BasicCompany {
  id: number,
}

export interface Company extends BasicCompany {
  name: string,
  phone: string,
  tell: string,
}