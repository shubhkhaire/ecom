const mongoose = require("mongoose");
const Product = require("../models/Product");
const data = require("./products");
require("dotenv").config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Product.deleteMany({});
    await Product.insertMany(data);
    console.log("Seeded products");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
seed();
