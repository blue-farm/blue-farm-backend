import express from 'express';
import * as retailModel from "../models/retail";
import { Retail, BasicRetail } from "../types/retail";

var router = express.Router();

module.exports = router;

// Get All Items
router.get("/", async (req, res) => {

    function queryParamToBool(value:any) {
        return ((value+'').toLowerCase() === 'true')
      }

    let sort: any = req.query.sort;
    let page: number = Number(req.query.page);
    let isShipped: boolean = queryParamToBool(req.query.isShipped);

    if (page == undefined || page == null)
        page = 0;
    if (sort == undefined || sort == null)
        sort = 'date';
    retailModel.findAll(sort, page, isShipped, (err: Error, orders: Retail[]) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).json({ "data": orders });
    });
});


// Insert New Item
router.post("/", async (req, res) => {
    const newOrder: Retail = req.body;

    retailModel.create(newOrder, (err: Error, orderID: number) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).json({ "orderId": orderID });
    });
});

// Get One Item
router.get("/:id", async (req, res) => {
    const orderID: number = Number(req.params.id);

    retailModel.findOne(orderID, (err: Error, order: Retail) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).json({ "data": order });
    });
});

// Edit One Item
router.put("/:id", async (req, res) => {
    const order: Retail = req.body;

    retailModel.update(order, (err: Error) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).send();
    })
});

// Delete One Item
router.delete("/:id", async (req, res) => {
    const orderID: number = Number(req.params.id);

    retailModel.deleteOne(orderID, (err: Error) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).send();
    });
});