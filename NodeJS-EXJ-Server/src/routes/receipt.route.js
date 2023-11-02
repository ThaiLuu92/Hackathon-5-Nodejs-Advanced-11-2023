import express from "express";

import ReceiptController from "../controller/receipt.controller.js";

const receiptController = new ReceiptController();
const receiptRouter = express.Router();

// API Receipt

receiptRouter.get("/", receiptController.getAllReceipt);

receiptRouter.post("/", receiptController.createReceipt);

receiptRouter.patch("/:id", receiptController.editReceipt);

export default receiptRouter;
