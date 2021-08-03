export interface BasicRetail {
  id: number,
}
  
export interface Retail extends BasicRetail {
  date:       string,
  name:       string,
  amount:     number,
  phone:      string,
  addr1:      string,
  addr2:      string,
  zip:        number,
  isPaid:     boolean,
  isShipped:  boolean,
  delivery:   boolean,
}