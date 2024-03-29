import { Company, BasicCompany } from "../types/company";
var db = require('../db');
// import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";


export const findAll = (callback: Function) => {
    const queryString = `
      SELECT 
       *
      FROM company 
      WHERE isDelete=false`
    console.log(queryString)

    db.query(queryString, (err: any, result: any) => {
        if (err) { callback(err) }

        const rows = <RowDataPacket[]>result;
        const companys: BasicCompany[] = [];

        rows.forEach(row => {
            const company: Company = {
                id: row.id,
                name: row.name,
                phone: row.phone,
                tell: row.tell,
            }
            companys.push(company);
        });
        callback(null, companys);
    });
}


export const create = (company: BasicCompany, callback: Function) => {
    const queryString = "INSERT INTO company (name, phone, tell) VALUES (?, ?, ?)"
    console.log(queryString)

    db.query(
        queryString,
        [company.name, company.phone, company.tell],
        (err: any, result: any) => {
            if (err) { callback(err) };

            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    );
};


export const findOne = (companyId: number, callback: Function) => {

    const queryString = `
      SELECT 
        id,
        name,
        phone,
        tell,
        isDelete
      FROM company
      WHERE id=?`
    console.log(queryString)

    db.query(queryString, companyId, (err: any, result: any) => {
        if (err) { callback(err) }

        const row = (<RowDataPacket>result)[0];
        const order: Company = {
            id: row.id,
            name: row.name,
            phone: row.phone,
            tell: row.tell
        }
        callback(null, order);
    });
}

export const update = (company: Company, callback: Function) => {
    const queryString = `UPDATE company SET name=?, phone=?, tell=? WHERE id=?`;
    console.log(queryString)

    db.query(
        queryString,
        [company.name, company.phone, company.tell, company.id],
        (err: any, result: any) => {
            if (err) { callback(err) }
            callback(null);
        }
    );
}

export const deleteOne = (companyId: any, callback: Function) => {
    // const queryString = `DELETE FROM company WHERE id=?`;
    const queryString = `UPDATE company SET isDelete=true WHERE id=?`;
    db.query(
        queryString,
        [companyId],
        (err: any, result: any) => {
            if (err) { callback(err) }
            callback(null);
        }
    );
}

