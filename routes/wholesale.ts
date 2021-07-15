import express from 'express';

var router = express.Router();

/* GET users listing. */
const testItem =
{
    list: [{
        id: 'testID_1',
        date: '20210715',
        name: 'Youjin',
        amount: 2,
        phone: '01012345678',
        address: '충남 천안시',
        payment: true,
        shipped: true,
        delivery: 'direct'
    },
    {
        id: 'testID_2',
        date: '20210716',
        name: 'Youjin2',
        amount: 3,
        phone: '01023456789',
        address: '경북 포항시',
        payment: false,
        shipped: false,
        delivery: 'express'
    }
    ],

    notShippedAmount: 5,
    totalCount: 100,
}


router.get('/', (req, res, next) => {
    var bPayment = req.query.bPayment;
    var bShipped = req.query.bShipped;
    var pageNum = req.query.pageNum;
    var itemCount = req.query.itemCount;
    var sort = req.query.sort;
    console.log('bPayment: ' + bPayment + ', pageNum: ' + pageNum);
    // res.send('GET request to the wholesale');
    res.json(testItem);
});

router.get('/test', (req, res, next) => {
    res.json(testItem);
})

router.get('/:id', (req, res, next) => {
    // console.log(req);
    var id = req.params.id;
    if (id == '1')
        res.json(testItem.list[0]);
    else if (id == '2')
        res.json(testItem.list[1]);
    else
        res.send(id + ' data is empty!');
    // res.status(200).send({
    //     total:total[0].total,cç
    //     list:info,
    //     saving:publish,
    //     use:use
    // });
});

router.post('/', function (req, res) {
    var id = req.body.id;
    console.log(req.body);
    if (id)
        res.send('data is updated!');
    else
        res.send('data is created!');

});

router.delete('/', (req, res, next) => {
    var id = req.body.id;

    if (id)
        res.send('data is delete!');
    else
        res.send('data is empty!');
    // res.send('respond with a resource');
});

module.exports = router;