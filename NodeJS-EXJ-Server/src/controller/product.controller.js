import fs from 'fs';

import { getData, insertData, deleteData, editData } from "../utils/util.js";

export default class ProductController {
  getAllProduct(req, res) {
    try {
      const products = getData("products");
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }

  getProductById(req, res) {
    const productId = req.params.id;
    try {
      const products = getData("products");
      const product = products.find((product) => product.id == productId);

      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }

  createProduct(req, res) {
    const newProduct = req.body;

    try {
      let products = getData("products");
      const maxId = products.reduce(
        (max, product) => (product.id > max ? product.id : max),
        0
      );
      newProduct.id = maxId + 1;
      insertData("products", newProduct);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  deleteProduct(req, res) {
    const productId = Number(req.params.id);
    if (isNaN(productId)) {
      res.status(400).json({ error: "Invalid user ID" });
      return;
    }
    try {
      const product = deleteData("products", productId);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  }

  editProduct(req, res) {
    const productId = Number(req.params.id);
    if (isNaN(productId)) {
      res.status(400).json({ error: "Invalid user ID" });
      return;
    }

    const updatedProduct = req.body;
    try {
      const product = editData("products", productId, updatedProduct);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}