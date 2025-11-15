import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/ProductModel.js";
import connectDB from "./config/db.js";
import products from "./data/products.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    const enriched = products.map((p) => ({
      ...p,
      countInStock: typeof p.countInStock === "number" ? p.countInStock : 20,
      rating: typeof p.rating === "number" ? p.rating : 0,
      numReviews: typeof p.numReviews === "number" ? p.numReviews : 0,
    }));
    await Product.insertMany(enriched);
    console.log("✅ Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
