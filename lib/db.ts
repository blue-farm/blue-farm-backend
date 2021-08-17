// var  mysql = require('mysql');
// var os = require('os');  //?��?��?�� ?��름을 �??��?���? ?��?�� 모듈
import mysql from "mysql2";
import * as dotenv from "dotenv";

// export const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PWD,
//     database: process.env.DB_NAME
// });

dotenv.config();

// var dbconnInfo = {
//     dev: {
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PWD,
//         database: process.env.DB_NAME
//     },
//     real: {
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PWD,
//         database: process.env.DB_NAME
//     }
// };

// var dbconnection = {
//     init: function () {
//         return mysql.createConnection(dbconnInfo.dev);	//로컬개발?���?
//         // var hostname = os.hostname();
//         // if(hostname === 'S1621N14'){
//         // 	return mysql.createConnection(dbconnInfo.dev);	//로컬개발?���?
//         // }else{
//         // 	return mysql.createConnection(dbconnInfo.real);	//cafe24 ?��버환�?
//         // }
//     },

//     dbopen: function (con: any) {
//         con.connect(function (err: any) {
//             if (err) {
//                 console.error("mysql connection error : " + err);
//             } else {
//                 console.info("mysql connection successfully.");
//             }
//         });
//     }
// };

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "blueberry",
    multipleStatements: true
});

db.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// db.end();


module.exports = db;