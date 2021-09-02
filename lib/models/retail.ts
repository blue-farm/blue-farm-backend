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

export const create = (order: Retail, callback: Function) => {
    const queryString = "INSERT INTO retail (id, DATE_FORMAT(date, '%Y-%m-%d'), name, amount, phone, addr1, addr2, zip, isPaid, isShipped, delivery) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

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

        const row = (<RowDataPacket>result)[0];
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

export const getPage = (sort:string, pageIdx:number, callback: Function) => {
    const queryString = `
      SELECT 
       *
      FROM retail
      ORDER BY ${sort}
      LIMIT ?, ? `

    const pageSize = 2;
    const firstItem = (pageIdx - 1) * pageSize; 
    
    db.query(queryString, [firstItem, pageSize], (err: any, result: any) => {
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

// Get total amount based on isShipped column
export const getTotalAmount = (bShipped: boolean, callback: Function) => {
    const queryString = `
      SELECT SUM(CASE WHEN isShipped = ${bShipped} THEN amount ELSE 0 END) AS total_amount
      FROM retail`

    db.query(queryString, (err: any, result: any) => {
        if (err) { callback(err) }

        const row = (<RowDataPacket[]>result)[0];
        const amount: number = row.total_amount;

        callback(null, amount);
    });
}