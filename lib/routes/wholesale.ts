import express, { Request, Response } from 'express';
import * as orderModel from "../models/order";
import * as companyModel from "../models/company";
import * as wholesaleModel from "../models/wholesale";
import { Order, BasicOrder } from "../types/order";
import { BasicCompany, Company } from 'types/company';
import { BasicWholesale, Wholesale } from 'types/wholesale';

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
        address: '충남 천안?��',
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
        address: '경북 ?��?��?��',
        payment: false,
        shipped: false,
        delivery: 'express'
    }
    ],

    notShippedAmount: 5,
    totalCount: 100,
}


//Wholesale
router.get("/", async (req, res) => {
    wholesaleModel.findAll((err: Error, wholesale: Wholesale[]) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).json({ "data": wholesale });
    });
});

router.post("/", async (req: Request, res: Response) => {
    const newWholesale: BasicWholesale = req.body;
    wholesaleModel.create(newWholesale.company_id, newWholesale, (err: Error, wholesale: number) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "wholesaleId": wholesale });
    });
});

router.get("/:id", async (req: Request, res: Response) => {
    const companyId: number = Number(req.params.id);
    wholesaleModel.findOne(companyId, (err: Error, wholesale: Wholesale) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": wholesale });
    })
});

router.put("/:id", async (req: Request, res: Response) => {
    const wholesale: Wholesale = req.body;
    wholesaleModel.update(wholesale, (err: Error) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).send();
    })
});


//Company
router.get("/company", async (req, res) => {
    companyModel.findAll((err: Error, company: Company[]) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).json({ "data": company });
    });
});

router.post("/company", async (req: Request, res: Response) => {
    const newCompany: BasicCompany = req.body;
    companyModel.create(newCompany, (err: Error, companyId: number) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "companyId": companyId });
    });
});

router.get("/company/:id", async (req: Request, res: Response) => {
    const companyId: number = Number(req.params.id);
    companyModel.findOne(companyId, (err: Error, company: Company) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": company });
    })
});

router.put("/company/:id", async (req: Request, res: Response) => {
    const company: Company = req.body;
    companyModel.update(company, (err: Error) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).send();
    })
});



// router.get('/', (req, res, next) => {
//     var bPayment = req.query.bPayment;
//     var bShipped = req.query.bShipped;
//     var pageNum = req.query.pageNum;
//     var itemCount = req.query.itemCount;
//     var sort = req.query.sort;
//     console.log('bPayment: ' + bPayment + ', pageNum: ' + pageNum);
//     // res.send('GET request to the wholesale');
//     res.json(testItem);
// });

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