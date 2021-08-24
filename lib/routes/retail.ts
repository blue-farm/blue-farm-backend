import express from 'express';
import * as retailModel from "../models/retail";
import { Retail, BasicRetail } from "../types/retail";

var router = express.Router();

module.exports = router;

// Get All Items
router.get("/getAll", async (req, res) => {
    retailModel.findAll((err: Error, orders: Retail[]) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).json({ "data": orders });
    });
});

// Insert New Item
router.post("/insert", async(req, res) => {
    const newOrder: Retail = req.body;

    retailModel.create(newOrder, (err: Error, orderID: number) => {
        if(err){
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).json({"orderId": orderID});
    });
});

// Get One Item
router.get("/get/:id", async(req, res) => {
    const orderID: number = Number(req.params.id);

    retailModel.findOne(orderID, (err:Error, order:Retail) =>{
        if(err){
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).json({"data": order});
    });
});

// Edit One Item
router.put("/edit/:id", async(req, res) => {
    const order: Retail = req.body;

    retailModel.update(order, (err: Error) => {
        if(err){
            return res.status(500).json({ "errorMessage": err.message });
        }
  
        res.status(200).send();
    })
});

// Delete One Item
router.get("/delete/:id", async(req, res) => {
    const orderID: number = Number(req.params.id);

    retailModel.deleteOne(orderID, (err:Error) =>{
        if(err){
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).send();
    });
});