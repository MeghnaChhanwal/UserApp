// routes/OrderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); // Import your Mongoose model

// POST: Save a new order
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Order saved successfully" });
  } catch (error) {
    console.error("❌ Error saving order:", error);
    res.status(500).json({ error: "Failed to save order" });
  }
});

// ✅ GET: Fetch all orders (for testing/debugging)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
