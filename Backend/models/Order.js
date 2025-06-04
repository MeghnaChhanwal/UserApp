const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  items: Array,
  user: {
    name: String,
    mobile: String,
    address: String
  },
  instructions: String,
  orderType: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", OrderSchema);
