import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/Status.module.css";

const Status = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { orderId, user, grandTotal, totalPrepTime } = location.state || {};

  // If no orderId in state, redirect or show error
  if (!orderId) {
    return (
      <div className={styles.statusWrapper}>
        <div className={styles.card}>
          <h2 className={styles.error}>⚠️ Invalid Order</h2>
          <p>It looks like there's no valid order data.</p>
          <button className={styles.backButton} onClick={() => navigate("/menu")}>
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.statusWrapper}>
      <div className={styles.card}>
        <h2 className={styles.success}>✅ Order Placed Successfully!</h2>

        <div className={styles.details}>
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Name:</strong> {user?.name || "Guest"}</p>
          <p><strong>Total:</strong> ₹{grandTotal.toFixed(2)}</p>
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
