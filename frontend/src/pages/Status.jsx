import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/Status.module.css";

const Status = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { orderId, user, grandTotal, totalPrepTime } = location.state || {};

  if (!orderId) {
    return (
      <div className={styles.statusWrapper}>
        <h2>Invalid Order</h2>
        <button className={styles.backButton} onClick={() => navigate("/menu")}>
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className={styles.statusWrapper}>
      <div className={styles.card}>
        <h2 className={styles.success}>🎉 Order Placed Successfully!</h2>
        <p><strong>Order ID:</strong> {orderId}</p>
        <p><strong>Name:</strong> {user?.name || "Guest"}</p>
        <p><strong>Total:</strong> ₹{grandTotal.toFixed(2)}</p>
        <p><strong>Estimated Time:</strong> {totalPrepTime} mins</p>

        <button className={styles.backButton} onClick={() => navigate("/menu")}>
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default Status;
