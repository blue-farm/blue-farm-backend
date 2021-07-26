// var  mysql = require('mysql');
// var os = require('os');  //호스트 이름을 가져오기 위한 모듈
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
//         return mysql.createConnection(dbconnInfo.dev);	//로컬개발환경
//         // var hostname = os.hostname();
//         // if(hostname === 'S1621N14'){
//         // 	return mysql.createConnection(dbconnInfo.dev);	//로컬개발환경
//         // }else{
//         // 	return mysql.createConnection(dbconnInfo.real);	//cafe24 서버환경
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
    database: "OnlineStore"
});

db.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// db.end();


module.exports = db;