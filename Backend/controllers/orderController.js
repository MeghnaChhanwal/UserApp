const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    console.log(" Incoming Order Data:", req.body);

    const { items, total, instructions, orderType } = req.body;

    if (!items || !total) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new Order({ items, total, instructions, orderType });
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    console.error("Order Save Error:", err);
    res.status(500).json({ message: "Failed to place order" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
