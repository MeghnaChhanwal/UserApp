// /routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/cart", async (req, res) => {
  try {
    const { cartItems, user, instructions, orderType } = req.body;

    const newOrder = new Order({
      items: cartItems,
      user,
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

module.exports = router;
