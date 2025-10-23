import express from "express";
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/products", addProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);

export default router;
