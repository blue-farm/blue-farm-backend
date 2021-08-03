import express, { Request, Response } from 'express';
import * as orderModel from "../models/order";
import * as companyModel from "../models/company";
import * as wholesaleModel from "../models/wholesale";
import { Order, BasicOrder } from "../types/order";
import { BasicCompany, Company } from 'types/company';
import { BasicWholesale, Wholesale } from 'types/wholesale';

var router = express.Router();


router.get("/", async (req, res) => {
    console.log("/company get")
    companyModel.findAll((err: Error, company: Company[]) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).json({ "data": company });
    });
});

router.post("/", (req, res: Response) => {
    console.log("/company post")
    const newCompany: BasicCompany = req.body;
    console.log(req.body)
    console.log(newCompany)
    if(!newCompany)
    return res.status(500).json({ "message": "empty" });

    companyModel.create(newCompany, (err: Error, companyId: number) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "companyId": companyId });
    });
});

router.get("/:id", async (req: Request, res: Response) => {
    console.log("/company get id")
    const companyId: number = Number(req.params.id);
    companyModel.findOne(companyId, (err: Error, company: Company) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": company });
    })
});

router.put("/:id", async (req: Request, res: Response) => {
    console.log("/company put")
    const company: Company = req.body;
    companyModel.update(company, (err: Error) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).send();
    })
});


module.exports = router;