import { Router } from "express";
import CartController from "../dao/dbManager/carts.js";
import ProductController from "../dao/dbManager/products.js";

const router = Router();

router.get("/carts", async (req, res) => {
  const carts = new CartController();
  const result = await carts.getAll();
  res.render("carts", { carts: result });
});

router.get("/products", async (req, res) => {
  const products = new ProductController();
  const result = await products.getAll();
  res.render("products", { products: result });
});

export default router;