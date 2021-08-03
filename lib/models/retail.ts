import { Retail, BasicRetail } from "../types/retail";
var db = require('../db');
import { OkPacket, RowDataPacket } from "mysql2";

export const findAll = (callback: Function) => {
    const queryString = `
      SELECT 
       *
      FROM retail `

    db.query(queryString, (err: any, result: any) => {
        if (err) { callback(err) }

        const rows = <RowDataPacket[]>result;
        const orders: Retail[] = [];

        rows.forEach(row => {
            const order: Retail = {
                id:         row.id,
                date:       row.date,
                name:       row.name,
                amount:     row.amount,
                phone:      row.phone,
                addr1:      row.addr1,
                addr2:      row.addr2,
                zip:        row.zip,
                isPaid:     row.isPaid,
                isShipped:  row.isShipped,
                delivery:   row.delivery,
            }
            orders.push(order);
        });
        callback(null, orders);
    });
}