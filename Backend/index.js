
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());


const MONGO_URI = "mongodb://localhost:27017/User";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


const orderSchema = new mongoose.Schema({
  cartItems: [
    {
      name: String,
      price: Number,
      quantity: Number,
      prepTime: Number,
      image: String,
    }
  ],
  user: {
    name: String,
    mobile: String,
    address: String,
  },
  instructions: String,
  orderType: String, 
  totalPrepTime: Number,
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);


app.post("/api/cart", async (req, res) => {
  try {
    const { cartItems, user, instructions, orderType } = req.body;

    
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }
    if (!user || !user.name || !user.mobile || !user.address) {
      return res.status(400).json({ error: "User details missing" });
    }
    if (!orderType) {
      return res.status(400).json({ error: "Order type missing" });
    }

    
    const totalPrepTime = cartItems.reduce((sum, item) => {
      return sum + (item.prepTime || 0) * (item.quantity || 1);
    }, 0);

    const newOrder = new Order({
      cartItems,
      user,
      instructions,
      orderType,
      totalPrepTime
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", orderId: newOrder._id });

  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Server error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
