import express, { Request, Response } from 'express';
import * as orderModel from "../models/order";
import * as companyModel from "../models/company";
import * as wholesaleModel from "../models/wholesale";
import { Order, BasicOrder } from "../types/order";
import { BasicCompany, Company } from 'types/company';
import { BasicWholesale, Wholesale } from 'types/wholesale';

var router = express.Router();


//Wholesale

router.get("/testtt", async (req: Request, res: Response) => {
    console.log("/wholesale get id")
    const page: number = Number(req.params.page);
    wholesaleModel.findAld(page, (err: Error, wholesale: Wholesale) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": wholesale });
    })
});


router.get("/", async (req, res) => {
    console.log("/wholesale get")
    wholesaleModel.findAll((err: Error, wholesale: Wholesale[]) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).json({ "data": wholesale });
    });
});

router.post("/", async (req: Request, res: Response) => {
    const newWholesale: BasicWholesale = req.body;
    console.log("/wholesale post")
    wholesaleModel.create(newWholesale.company_id, newWholesale, (err: Error, wholesale: number) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "wholesaleId": wholesale });
    });
});

router.get("/:id", async (req: Request, res: Response) => {
    console.log("/wholesale get id")
    const companyId: number = Number(req.params.id);
    wholesaleModel.findOne(companyId, (err: Error, wholesale: Wholesale) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": wholesale });
    })
});



router.put("/:id", async (req: Request, res: Response) => {
    console.log("/wholesale put")
    const wholesale: Wholesale = req.body;
    wholesaleModel.update(wholesale, (err: Error) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).send({"wholesaleId":wholesale.id});
    })
});

router.delete("/:id", async (req: Request, res: Response) => {
    console.log("/wholesale delete")
    const wholesaleId: number = Number(req.params.id);
    wholesaleModel.deleteOne(wholesaleId, (err: Error) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).send({"wholesaleId":wholesaleId});
    })
});

module.exports = router;