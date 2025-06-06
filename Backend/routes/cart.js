

import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/cart", async (req, res) => {
  const { cartItems, user, instructions } = req.body;

  if (!cartItems || !user?.name || !user?.mobile || !user?.address) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const newOrder = new Order({ cartItems, user, instructions });
    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      orderId: newOrder._id,
      orderDetails: newOrder,
    });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
