import { Wholesale, BasicWholesale, WholesaleWithDelivery } from "../types/wholesale";
import { Companies } from "../types/company";
var db = require('../db');
import { OkPacket, RowDataPacket } from "mysql2";
import { Delivery, BasicDelivery } from "types/delivery";
var moment = require('moment');


export const findAll = (companyID: number, callback: Function) => {
    let sortItem = `date DESC`;

    const companyString = `
    SELECT 
        id,
        name
    FROM  company
    WHERE id = ${companyID};
    `
    const wholesaleString = `
      SELECT 
        w.id AS id,
        w.amount AS amount,
        sum(d.amount) As deliveryAmount,
        w.date AS date,
        w.dueDate AS dueDate,
        w.company_id AS company_id
      FROM wholesale AS w
      INNER JOIN delivery AS d ON w.id=d.wholesale_id
      WHERE w.company_id=${companyID}
      GROUP BY w.id;
      `

    console.log(companyString)
    console.log(wholesaleString)

    db.query(companyString + wholesaleString, (err: any, result: any) => {
        if (err) { callback(err) }
        const row1 = <RowDataPacket[]>result[0];
        const row2 = <RowDataPacket[]>result[1];
        let company: any;
        const wholesales: WholesaleWithDelivery[] = [];
        // let wholesales_ids: number[] = [];

        row1.forEach(row => {
            company = {
                id: row.id,
                name: row.name,
            }
        });
        console.log('company')
        console.log(company)
        row2.forEach(row => {
            const wholesale: WholesaleWithDelivery = {
                id: row.id,
                date: moment(row.date).format("YYYY-MM-DD"),
                deliveryAmount: row.amount,
                notDeliveryAmount: row.deliveryAmount,
                dueDate: row.dueDate,
                company_id: row.company_id,
                delivery: []
            }
            wholesales.push(wholesale);
            // wholesales_ids.push(wholesale.company_id);
        });
        console.log('wholesales')
        console.log(wholesales)
        // wholesales_ids = Array.from(new Set(wholesales_ids));

        let findDeliveryString = ``;
        for (let index = 0; index < wholesales.length; index++) {
            const element = wholesales[index];
            console.log('element')
            console.log(element)
            findDeliveryString += `
            SELECT 
                *
            FROM delivery 
            WHERE wholesale_id=${element.id};
          `
        }
        console.log('findDeliveryString')
        console.log(findDeliveryString)
        db.query(findDeliveryString, (err: any, result: any) => {
            if (err) { callback(err) }
            let deliveries: Delivery[] = [];
            console.log('result')
            console.log(result)
            for (let index = 0; index < result.length; index++) {
                const rows = <RowDataPacket[]>result[index];
                console.log('rows')
                console.log(rows)

                let wholesaleId: number;
                for (let index = 0; index < rows.length; index++) {
                    const element = rows[index];
                    
                }
                rows.forEach(row => {
                    const delivery: Delivery = {
                        id: row.id,
                        date: row.date,
                        amount: row.amount,
                        pricePerKg: row.pricePerKg,
                        isDelivered: row.isDelivered,
                        isPaid: row.isPaid,
                        deliveryDate: row.deliveryDate,
                        wholesale_id: row.wholesale_id
                    }
                    wholesaleId = row.id;
                    deliveries.push(delivery)
                });
                const i = wholesales.findIndex(element => element.id == wholesaleId);
                wholesales[i].delivery = deliveries;
            }
            let data = {
                company,
                wholesales,
            }
            callback(null, data);
        });
    });
}


export const create = (wholesaleId: number, delivery: BasicDelivery, callback: Function) => {
    const queryString = "INSERT INTO delivery (wholesale_id, date, amount, pricePerKg, isDelivered, isPaid, deliveryDate) VALUES (?, ?, ?, ?, ?, ?, ?)"
    console.log(queryString)

    db.query(
        queryString,
        [wholesaleId, delivery.date, delivery.amount, delivery.pricePerKg, delivery.isDelivered, delivery.isPaid, delivery.deliveryDate],
        (err: any, result: any) => {
            if (err) { callback(err) };

            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    );
};


export const findOne = (deliveryID: number, callback: Function) => {

    const queryString = `
      SELECT 
        id,
        date,
        amount,
        pricePerKg,
        isDelivered,
        isPaid,
        deliveryDate,
        wholesale_id
      FROM delivery
      WHERE id=?`

    db.query(queryString, deliveryID, (err: any, result: any) => {
        if (err) { callback(err) }

        const row = (<RowDataPacket>result)[0];
        if (!row)
            callback(null)
        const delivery: Delivery = {
            id: row.id,
            date: moment(row.date).format("YYYY-MM-DD"),
            amount: row.amount,
            pricePerKg: row.pricePerKg,
            isDelivered: row.isDelivered,
            isPaid: row.isPaid,
            deliveryDate: row.deliveryDate,
            wholesale_id: row.wholesale_id,
        }
        callback(null, delivery);
    });
}

export const update = (delivery: Delivery, callback: Function) => {
    const queryString = `UPDATE delivery SET date=?, amount=?, pricePerKg=?, isDelivered=?, isPaid=?, deliveryDate=?, wholesale_id=? WHERE id=?`;

    db.query(
        queryString,
        [delivery.date, delivery.amount, delivery.pricePerKg, delivery.isDelivered, delivery.isPaid, delivery.deliveryDate, delivery.wholesale_id, delivery.id,],
        (err: any, result: any) => {
            if (err) { callback(err) }
            callback(null);
        }
    );
}

export const deleteOne = (deliveryID: any, callback: Function) => {
    const queryString = `DELETE FROM delivery WHERE id=?`;
    db.query(
        queryString,
        [deliveryID],
        (err: any, result: any) => {
            if (err) { callback(err) }
            callback(null);
        }
    );
}
