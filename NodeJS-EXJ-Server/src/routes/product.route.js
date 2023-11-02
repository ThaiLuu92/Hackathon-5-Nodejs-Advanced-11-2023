import  express  from "express";
import ProductController from "../controller/product.controller.js";
const productController = new ProductController()
const productRouter = express.Router()

// API Product

productRouter.get("/", productController.getAllProduct);

productRouter.get("/:id", productController.getProductById);

productRouter.post("/", productController.createProduct);

productRouter.delete("/:id", productController.deleteProduct);

productRouter.patch("/:id", productController.editProduct);


export default productRouter