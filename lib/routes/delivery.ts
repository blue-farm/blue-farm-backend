import express, { Request, Response } from 'express';
import * as deliveryModel from "../models/delivery";
import { Delivery, BasicDelivery } from 'types/delivery';

var router = express.Router();


//delivery

router.get("/", async (req, res) => {
    console.log("/delivery get")
    const companyID: number = Number(req.query.company);
    deliveryModel.findAll(companyID, (err: Error, delivery: Delivery[]) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).json({ "data": delivery });
    });
});

router.post("/", async (req: Request, res: Response) => {
    const newdelivery: BasicDelivery = req.body;
    console.log("/delivery post")
    deliveryModel.create(newdelivery.wholesale_id, newdelivery, (err: Error, deliveryID: number) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "deliveryeId": deliveryID });
    });
});

router.get("/:id", async (req: Request, res: Response) => {
    console.log("/delivery get id")
    const deliveryId: number = Number(req.params.id);
    deliveryModel.findOne(deliveryId, (err: Error, delivery: Delivery) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": delivery });
    })
});



router.put("/:id", async (req: Request, res: Response) => {
    console.log("/delivery put")
    const delivery: Delivery = req.body;
    deliveryModel.update(delivery, (err: Error) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).send({ "deliveryId": delivery.id });
    })
});

router.delete("/:id", async (req: Request, res: Response) => {
    console.log("/delivery delete")
    const deliveryId: number = Number(req.params.id);
    deliveryModel.deleteOne(deliveryId, (err: Error) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).send({ "deliveryId": deliveryId });
    })
});

module.exports = router;