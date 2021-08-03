export interface BasicRetail {
  id: number,
}
  
export interface Retail extends BasicRetail {
  date:       Date,
  name:       string,
  amount:     number,
  phone:      string,
  addr1:      string,
  addr2:      string,
  zip:        string,
  isPaid:     boolean,
  isShipped:  boolean,
  delivery:   boolean,
}