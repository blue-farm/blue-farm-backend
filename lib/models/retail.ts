import { Retail, BasicRetail } from "../types/retail";
var db = require('../db');
import { OkPacket, RowDataPacket } from "mysql2";


export const findAll = (sort: any, pageIdx: number, callback: Function) => {
    const queryGetItemString = `
      SELECT 
       *
      FROM retail
      ORDER BY ${sort}
      LIMIT ${pageIdx * 2}, 2;`

    const queryGetAmountString = `
      SELECT 
        SUM(CASE WHEN isShipped = true THEN amount ELSE 0 END) AS shipped_amount,
        SUM(CASE WHEN isShipped = false THEN amount ELSE 0 END) AS unshipped_amount
      FROM retail;`

    db.query(queryGetItemString + queryGetAmountString, (err: any, result: any) => {
        if (err) { callback(err) }

        const row1 = <RowDataPacket[]>result[0];
        const row2 = <RowDataPacket[]>result[1];
        
        const orders: Retail[] = [];
        var moment = require('moment');

        row1.forEach(row => {
            const order: Retail = {
                id:         row.id,
                date:       moment(row.date).format("YYYY-MM-DD"),
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

        var s_amount: number = 0;
        var us_amount: number = 0;

        row2.forEach(row => {
            s_amount = row.shipped_amount;
            us_amount = row.unshipped_amount;    
        });
            
        let rstData = {
            orders,
            s_amount,
            us_amount
        }

        callback(null, rstData);
    });    
}

export const create = (order: Retail, callback: Function) => {
    const queryString = "INSERT INTO retail (id, date, name, amount, phone, addr1, addr2, zip, isPaid, isShipped, delivery) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

    db.query(
        queryString,
        [order.id, order.date, order.name, order.amount, order.phone, order.addr1, order.addr2, order.zip, order.isPaid, order.isShipped, order.delivery],
        (err: any, result: any) => {
            if (err) { callback(err) };

            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    );
};

export const findOne = (orderId: number, callback: Function) => {
    const queryString = `
      SELECT *
      FROM retail
      WHERE id = ${orderId}`

    db.query(queryString, (err: any, result: any) => {
        if (err) { callback(err) }

        var moment = require('moment');

        const row = (<RowDataPacket>result)[0];
        const order: Retail = {
            id:         row.id,
            date:       moment(row.date).format("YYYY-MM-DD"),
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
        callback(null, order);
    });
}

export const update = (order: Retail, callback: Function) => {
    const queryString = `
        UPDATE retail 
        SET date=?, name=?, amount=?, phone=?, addr1=?, addr2=?, zip=?, isPaid=?, isShipped=?, delivery=? 
        WHERE id=?`;

    db.query(
        queryString,
        [order.date, order.name, order.amount, order.phone, order.addr1, order.addr2, order.zip, order.isPaid, order.isShipped, order.delivery, order.id],
        (err: any, result: any) => {
            if (err) { callback(err) }
            callback(null);
        }
    );
}

export const deleteOne = (orderId: number, callback: Function) => {
    const queryString = `
      DELETE
      FROM retail
      WHERE id = ${orderId}`

    db.query(queryString, (err: any, result: any) => {
        if (err) { callback(err) }
        callback(null);
    });
}