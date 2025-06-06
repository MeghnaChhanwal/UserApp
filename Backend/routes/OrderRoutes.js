const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// POST: Place an order
router.post("/cart", async (req, res) => {
  try {
    const { cartItems, user, instructions, orderType } = req.body;

    const newOrder = new Order({
      items: cartItems,
      user, // user must contain mobile, name, address
      instructions,
      orderType,
      createdAt: new Date()
    });

    const savedOrder = await newOrder.save();

    res.status(200).json({
      message: "Order placed",
      orderId: savedOrder._id,
      orderTime: savedOrder.createdAt
    });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// ✅ GET: Fetch all orders including mobile numbers
router.get("/cart", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // sorted latest first
    res.status(200).json({ orders }); // includes user.mobile by default
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
