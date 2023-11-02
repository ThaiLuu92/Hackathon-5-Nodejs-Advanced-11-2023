import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { getData, editData } from "../utils/util.js";
import { log } from "console";

export default class ReceiptController {
  getAllReceipt(req, res) {
    try {
      const receipts = getData("receipts");
      res.status(200).json(receipts);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }

  editReceipt(req, res) {
    const receiptId = Number(req.params.id);
    if (isNaN(receiptId)) {
      res.status(400).json({ error: "Invalid user ID" });
      return;
    }

    const updatedReceipt = req.body;
    try {
      const receipt = editData("receipts", receiptId, updatedReceipt);
      res.status(200).json(receipt);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
 createReceipt(req, res) {
    const newReceipt = req.body;
    newReceipt.id = uuidv4();
    try {
        const jsonData = fs.readFileSync('./src/models/receipts.json', 'utf8');
        const data = JSON.parse(jsonData);
        data.push(newReceipt);
        fs.writeFileSync('./src/models/receipts.json', JSON.stringify(data));
        res.status(201).json(newReceipt);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
}