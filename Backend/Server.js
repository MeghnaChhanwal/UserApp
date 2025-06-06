const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000; // ✅ Only declare once

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const orderRoutes = require("./routes/OrderRoutes");
app.use("/api/cart", orderRoutes); // Route prefix

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
