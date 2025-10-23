import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";
const router = express.Router();


router.post("/", createOrder);

export default router;
