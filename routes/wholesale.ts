import express from 'express';

var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
    var bPayment = req.query.bPayment;
    var bShipped = req.query.bShipped;
    var pageNum = req.query.pageNum;
    var itemCount = req.query.itemCount;
    var sort = req.query.sort;
    res.send('GET request to the wholesale');
});

router.get('/:id', (req, res, next) => {
    // console.log(req);
    var id = req.params.id;
    res.send('GET request to the wholesale. id :' + id);
});

router.post('/', function (req, res) {
    console.log(req.body)
    res.send('POST request to the wholesale');
});

router.delete('/', (req, res, next) => {
    res.send('respond with a resource');
});

module.exports = router;