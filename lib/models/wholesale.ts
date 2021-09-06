import { Wholesale, BasicWholesale } from "../types/wholesale";
import { Companies } from "../types/company";
// import { db } from "../db";
var db = require('../db');
import { OkPacket, RowDataPacket } from "mysql2";
var moment = require('moment');

// export const findAll = (callback: Function) => {

//     const findAllString = `
//       SELECT 
//         *
//       FROM wholesale
//       `
//       console.log(findAllString)

//     db.query(findAllString, (err: any, result: any) => {
//         if (err) { callback(err) }

//         const row1 = <RowDataPacket[]>result;
//         const wholesales: Wholesale[] = [];
//         console.log(row1)

//         row1.forEach(row => {
//             const wholesale: Wholesale = {
//                 id: row.id,
//                 date: row.date,
//                 amount: row.amount,
//                 pricePerKg: row.pricePerKg,
//                 isDelivered: row.isDelivered,
//                 isPaid: row.isPaid,
//                 dueDate: row.dueDate,
//                 company_id: row.company_id,
//             }

//             wholesales.push(wholesale);

//         });
//         callback(null, wholesales);
//     });
// }
export const findAll1 = (callback: Function) => {

    const findAllString = `
      SELECT 
        *
      FROM wholesale
      `
    console.log(findAllString)

    db.query(findAllString, (err: any, result: any) => {
        if (err) { callback(err) }

        const row1 = <RowDataPacket[]>result;
        const wholesales: Wholesale[] = [];
        console.log(row1)

        row1.forEach(row => {
            const wholesale: Wholesale = {
                id: row.id,
                date: row.date,
                amount: row.amount,
                pricePerKg: row.pricePerKg,
                isDelivered: row.isDelivered,
                isPaid: row.isPaid,
                dueDate: row.dueDate,
                company_id: row.company_id,
            }

            wholesales.push(wholesale);

        });
        callback(null, wholesales);
    });
}

export const findAll2 = (callback: Function) => {

    const findAllString = `
    SELECT 
        w.company_id AS id,
        c.name AS name,
        sum(w.amount) As totalAmount,
        sum(CASE When w.isDelivered=0 Then w.amount Else 0 End ) As notShippedAmount
    FROM wholesale AS w
    INNER JOIN company AS c ON c.id=w.company_id
    GROUP BY w.company_id
      `
    console.log(findAllString)

    db.query(findAllString, (err: any, result: any) => {
        if (err) { callback(err) }

        const row1 = <RowDataPacket[]>result;
        const wholesales: any[] = [];
        console.log(row1)

        row1.forEach(row => {
            const wholesale: any = {
                row
            }

            wholesales.push(wholesale);

        });
        callback(null, wholesales);
    });
}

export const findAll3 = (callback: Function) => {

    const findAllString = `
    SELECT 
        sum(CASE When isDelivered=0 Then amount Else 0 End ) As notShippedAmount
    FROM wholesale
      `
    console.log(findAllString)

    db.query(findAllString, (err: any, result: any) => {
        if (err) { callback(err) }

        const row1 = <RowDataPacket[]>result;
        const wholesales: any[] = [];
        console.log(row1)

        row1.forEach(row => {
            const wholesale: any = {
                row
            }

            wholesales.push(wholesale);

        });
        callback(null, wholesales);
    });
}
export const findAll = (callback: Function) => {

    const countString = `
    SELECT 
        sum(CASE When isDelivered=0 Then amount Else 0 End ) As notShippedAmount,
        sum(CASE When isDelivered=1 Then amount Else 0 End ) As shippedAmount
    FROM wholesale;
    `
    const findCompanyString = `
      SELECT 
        w.company_id AS id,
        c.name AS name,
        sum(w.amount) As totalAmount,
        sum(CASE When w.isDelivered=0 Then w.amount Else 0 End ) As unShippedAmount
      FROM wholesale AS w
      INNER JOIN company AS c ON c.id=w.company_id AND c.isDelete=false
      GROUP BY w.company_id;
      `

    const findAllString = `
      SELECT 
        *
      FROM wholesale;
      `
    console.log(countString)
    console.log(findCompanyString)

    db.query(countString + findCompanyString + findAllString, (err: any, result: any) => {
        if (err) { callback(err) }
        const row1 = <RowDataPacket[]>result[0];
        const row2 = <RowDataPacket[]>result[1];
        const row3 = <RowDataPacket[]>result[2];
        let notShippedAmount: number = 0;
        let shippedAmount: number = 0;
        let companies: Companies[] = [];
        row1.forEach(row => {
            notShippedAmount = row.notShippedAmount;
            shippedAmount = row.shippedAmount;
        });
        row2.forEach(row => {
            const company: Companies = {
                id: row.id,
                name: row.name,
                totalAmount: row.totalAmount,
                unShippedAmount: row.unShippedAmount,
                shippedAmount: row.shippedAmount,
                wholesales: []
            }
            companies.push(company);
        });

        row3.forEach(row => {
            const wholesale: Wholesale = {
                id: row.id,
                date: moment(row.date).format("YYYY-MM-DD"),
                amount: row.amount,
                pricePerKg: row.pricePerKg,
                isDelivered: row.isDelivered,
                isPaid: row.isPaid,
                dueDate: row.dueDate,
                company_id: row.company_id,
                name: row.name,//company_name
            }

            let i = companies.findIndex(_ => _.id == row.company_id);
            if (i >= 0)
                companies[i].wholesales.push(wholesale);
        });
        let data = {
            companies,
            notShippedAmount,
            shippedAmount
        }
        callback(null, data);
    });
}

export const findAld = (page: number, sort: any, callback: Function) => {
    let sortItem = `date DESC`;

    if (sort && (sort == `name` || sort == `amount` || sort == `pricePerKg` || sort == `dueDate`))
        sortItem = sort + ` ASC`;

    const countString = `
    SELECT 
        sum(CASE When isDelivered=0 Then amount Else 0 End ) As unShippedAmount,
        sum(CASE When isDelivered=1 Then amount Else 0 End ) As shippedAmount
    FROM wholesale;
    `
    const findAllString = `
      SELECT 
        *
      FROM wholesale 
      ORDER BY ${sortItem} LIMIT 20 OFFSET ${page * 20};
      `
    db.query(countString + findAllString, (err: any, result: any) => {
        if (err) { callback(err) }
        const row1 = <RowDataPacket[]>result[0];
        const row2 = <RowDataPacket[]>result[1];
        let unShippedAmount: number = 0;
        let shippedAmount: number = 0;
        const wholesales: Wholesale[] = [];
        let wholesales_ids: number[] = [];

        row1.forEach(row => {
            unShippedAmount = row.unShippedAmount;
            shippedAmount = row.shippedAmount;
        });
        row2.forEach(row => {
            const wholesale: Wholesale = {
                id: row.id,
                date: moment(row.date).format("YYYY-MM-DD"),
                amount: row.amount,
                pricePerKg: row.pricePerKg,
                isDelivered: row.isDelivered,
                isPaid: row.isPaid,
                dueDate: row.dueDate,
                company_id: row.company_id,
                name: row.name,//company_name
            }
            wholesales.push(wholesale);
            wholesales_ids.push(wholesale.company_id);
        });
        wholesales_ids = Array.from(new Set(wholesales_ids));

        let findCompanyString = ``;
        for (let index = 0; index < wholesales_ids.length; index++) {
            const element = wholesales_ids[index];
            findCompanyString += `
            SELECT 
            w.company_id AS id,
            c.name AS name,
            sum(w.amount) As totalAmount,
            sum(CASE When w.isDelivered=0 Then w.amount Else 0 End ) As notShippedAmount
          FROM wholesale AS w
          INNER JOIN company AS c ON c.id=w.company_id AND  c.isDelete=false
          WHERE w.company_id = '${element}' 
          GROUP BY w.company_id;
          `
        }
        db.query(findCompanyString, (err: any, result: any) => {
            if (err) { callback(err) }
            let companies: Companies[] = [];
            for (let index = 0; index < result.length; index++) {
                const rows = <RowDataPacket[]>result[index];
                rows.forEach(row => {
                    const company: Companies = {
                        id: row.id,
                        name: row.name,
                        totalAmount: row.totalAmount,
                        unShippedAmount: row.unShippedAmount,
                        shippedAmount: row.shippedAmount,
                        wholesales: []
                    }
                    company.wholesales = wholesales.filter(element => element.company_id == company.id);
                    companies.push(company);
                });

            }
            let data = {
                companies,
                unShippedAmount,
                shippedAmount
            }
            callback(null, data);
        });
    });
}


export const create = (companyId: number, wholesale: BasicWholesale, callback: Function) => {
    const queryString = "INSERT INTO wholesale (company_id, date, amount, pricePerKg, isDelivered, isPaid, dueDate) VALUES (?, ?, ?, ?, ?, ?, ?)"
    console.log(queryString)

    db.query(
        queryString,
        [companyId, wholesale.date, wholesale.amount, wholesale.pricePerKg, wholesale.isDelivered, wholesale.isPaid, wholesale.dueDate],
        (err: any, result: any) => {
            if (err) { callback(err) };

            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    );
};


export const findOne = (wholesaleId: number, callback: Function) => {

    const queryString = `
      SELECT 
        id,
        date,
        amount,
        pricePerKg,
        isDelivered,
        isPaid,
        dueDate,
        company_id
      FROM wholesale
      WHERE id=?`

    db.query(queryString, wholesaleId, (err: any, result: any) => {
        if (err) { callback(err) }

        const row = (<RowDataPacket>result)[0];
        const wholesale: Wholesale = {
            id: row.id,
            date: moment(row.date).format("YYYY-MM-DD"),
            amount: row.amount,
            pricePerKg: row.pricePerKg,
            isDelivered: row.isDelivered,
            isPaid: row.isPaid,
            dueDate: row.dueDate,
            company_id: row.company_id,
        }
        callback(null, wholesale);
    });
}

export const update = (wholesale: Wholesale, callback: Function) => {
    const queryString = `UPDATE wholesale SET date=?, amount=?, pricePerKg=?, isDelivered=?, isPaid=?, dueDate=?, company_id=? WHERE id=?`;

    db.query(
        queryString,
        [wholesale.date, wholesale.amount, wholesale.pricePerKg, wholesale.isDelivered, wholesale.isPaid, wholesale.dueDate, wholesale.company_id, wholesale.id,],
        (err: any, result: any) => {
            if (err) { callback(err) }
            callback(null);
        }
    );
}

export const deleteOne = (wholesaleID: any, callback: Function) => {
    const queryString = `DELETE FROM wholesale WHERE id=?`;
    db.query(
        queryString,
        [wholesaleID],
        (err: any, result: any) => {
            if (err) { callback(err) }
            callback(null);
        }
    );
}
