import productRouter from "./product.route.js";
import receiptRouter from "./receipt.route.js";

export default function route(app) {
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/receipts", receiptRouter);

}
