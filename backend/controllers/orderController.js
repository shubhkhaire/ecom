import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const { userId, items, total } = req.body;
  const order = await Order.create({ userId, items, total });
  res.json({ message: "Order placed", order });
};
