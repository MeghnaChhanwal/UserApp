// backend/models/Order.js

import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      }
    ],
    user: {
      name: String,
      mobile: String,
      address: String,
    },
    instructions: String,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
