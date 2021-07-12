import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const wholesaleRouter = require('./routes/wholesale');
const retailRouter = require('./routes/retail');

const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.get('/', (req, res) => {
    res.send('Welcom Blueberry!');
})

// app.use('/', indexRouter);
app.use('/wholesale', wholesaleRouter);
app.use('/retail', retailRouter);

app.listen(port, () => {
    console.log('The application is listening on port ' + port);
})

// app.listen(port, function () {
//     console.log('Example app listening on port : ' + port);
// });