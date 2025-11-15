import Order from "../models/Order.js";
import Product from "../models/ProductModel.js";

// Helper: try to reduce stock for a product, or create product if missing
const processOrderItems = async (items = []) => {
  for (const item of items) {
    try {
      // item may include _id or productId or just product info
      const prodId = item._id || item.productId;
      const qty = item.qty || item.quantity || item.qtyOrdered || 1;

      if (prodId) {
        const product = await Product.findById(prodId);
        if (product) {
          // only update if countInStock available
          if (typeof product.countInStock === "number") {
            product.countInStock = Math.max(
              0,
              (product.countInStock || 0) - qty
            );
            await product.save();
          }
          continue;
        }
      }

      // If product not found by id, try to find by name to avoid duplicates
      if (item.name) {
        const existing = await Product.findOne({ name: item.name });
        if (existing) {
          if (typeof existing.countInStock === "number") {
            existing.countInStock = Math.max(
              0,
              (existing.countInStock || 0) - qty
            );
            await existing.save();
          }
          continue;
        }
      }

      // Create a minimal product record from item details so DB has the product
      const newProd = new Product({
        name: item.name || `Product ${Date.now()}`,
        price: item.price || item.unitPrice || 0,
        description: item.description || "",
        image: item.image || item.img || "",
        category: item.category || "uncategorized",
        countInStock: Math.max(0, (item.countInStock || 0) - qty),
      });
      await newProd.save();
    } catch (err) {
      console.error("Error processing order item stock:", err);
      // continue processing other items
    }
  }
};

export const createOrder = async (req, res) => {
  try {
    const { userId, items, total } = req.body;

    // create the order first
    const order = await Order.create({ userId, items, total });

    // process items: decrement stock or create product entries
    if (Array.isArray(items) && items.length) {
      // don't await to block response too long, but run in background
      processOrderItems(items).catch((err) => console.error(err));
    }

    return res.json({ message: "Order placed", order });
  } catch (err) {
    console.error("Failed to create order:", err);
    return res.status(500).json({ error: "Failed to place order" });
  }
};
