import express from "express";
import {
  getAllProducts,
  getProductById,
  getCategories,
  addProductReview,
  getRelatedProducts,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Listing
router.get("/", getAllProducts);

// Categories (must come before /:id)
router.get("/categories/list", getCategories);

// Product details and related (specific routes before param routes)
router.get("/:id/related", getRelatedProducts);
router.get("/:id", getProductById);

// Reviews
router.post("/:id/reviews", protect, addProductReview);

export default router;
