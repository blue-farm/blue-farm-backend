import express from 'express';
import * as retailModel from "../models/retail";
import { Retail, BasicRetail } from "../types/retail";

var router = express.Router();

module.exports = router;

// Get All Items
router.get("/", async (req, res) => {
    retailModel.findAll((err: Error, orders: Retail[]) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).json({ "data": orders });
    });
});

// Insert New Item
router.post("/", async(req, res) => {
    const newOrder: Retail = req.body;

    retailModel.create(newOrder, (err: Error, orderID: number) => {
        if(err){
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).json({"orderId": orderID});
    });
});

// Get One Item
router.get("/:id", async(req, res) => {
    const orderID: number = Number(req.params.id);

    retailModel.findOne(orderID, (err:Error, order:Retail) =>{
        if(err){
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).json({"data": order});
    });
});

// Edit One Item
router.put("/:id", async(req, res) => {
    const order: Retail = req.body;

    retailModel.update(order, (err: Error) => {
        if(err){
            return res.status(500).json({ "errorMessage": err.message });
        }
  
        res.status(200).send();
    })
});

// Delete One Item
router.delete("/:id", async(req, res) => {
    const orderID: number = Number(req.params.id);

    retailModel.deleteOne(orderID, (err:Error) =>{
        if(err){
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).send();
    });
});

// Get Items within the range
router.get("/page/:sort/:page", async(req, res) => {
    const sort: string = req.params.sort;
    const pageIdx: number = Number(req.params.page);

    retailModel.getPage(sort, pageIdx, (err:Error, orders: Retail[]) =>{
        if(err){
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).json({ "data": orders });
    });
});

// Get total amount shipped
router.get("/total-shipped", async(req, res) => {

    retailModel.getTotalAmount(true, (err:Error, amount: number) =>{
        if(err){
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).json({ "total-amount-shipped": amount });
    });
});

// Get total amount unshipped
router.get("/total-unshipped", async(req, res) => {

    retailModel.getTotalAmount(false, (err:Error, amount: number) =>{
        if(err){
            return res.status(500).json({ "errorMessage": err.message });
        }

        res.status(200).json({ "total-amount-unshipped": amount });
    });
});


