import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/Status.module.css";

const Status = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Try location.state first, fallback to localStorage, else empty object
  const locationState = location.state || JSON.parse(localStorage.getItem("lastOrder")) || {};
  const { orderId = "N/A", user = {}, grandTotal = 0, totalPrepTime = "N/A" } = locationState;

  // Always show data, no error message, fallback values used if missing

  return (
    <div className={styles.statusWrapper}>
      <div className={styles.card}>
        <h2 className={styles.success}>✅ Order Status</h2>

        <div className={styles.details}>
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Name:</strong> {user.name || "Guest"}</p>
          <p><strong>Total:</strong> ₹{Number(grandTotal).toFixed(2)}</p>
          <p><strong>Estimated Prep Time:</strong> {totalPrepTime} mins</p>
        </div>

        <p className={styles.info}>You will be notified once your food is ready 🍽️</p>

        <button className={styles.backButton} onClick={() => navigate("/menu")}>
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default Status;
