import express = require('express');
import dotenv = require('dotenv');
import mysql = require('mysql2');
// import * as dotenv from "dotenv";

const app = express();

dotenv.config();

// export const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PWD,
//     database: process.env.DB_NAME
//   });

const wholesaleRouter = require('./routes/wholesale');
const retailRouter = require('./routes/retail');
const companyRouter = require('./routes/company');

const port = 80;

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome Blueberry!');
})

// app.use('/', indexRouter);
app.use('/wholesale', wholesaleRouter);
app.use('/retail', retailRouter);
app.use('/company', companyRouter);

app.listen(port, () => {
    console.log('The application is listening on port ' + port);
})

// app.listen(port, function () {
//     console.log('Example app listening on port : ' + port);
// });