import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/Cart.module.css";
import SearchBar from "../components/SearchBar";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialItems = location.state?.cart || [];
  const initialInstructions = location.state?.instructions || "";

  const formattedItems = initialItems.map(item => ({
    ...item,
    quantity: item.quantity || 1,
  }));

  const [cartItems, setCartItems] = useState(formattedItems);
  const [instructions, setInstructions] = useState(initialInstructions);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderType, setOrderType] = useState("");
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    address: "",
  });

  useEffect(() => {
    const hasItems = cartItems.some(item => item.quantity > 0);
    if (!hasItems) {
      navigate("/menu"); // Redirect if cart becomes empty
    }
  }, [cartItems, navigate]);

  const handleQuantityChange = (index, delta) => {
    setCartItems(prev =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  const handleUserChange = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const filteredItems = cartItems
    .filter(item => item.quantity > 0)
    .filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const itemTotal = filteredItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalPrepTime = filteredItems.reduce(
    (sum, item) => sum + item.prepTime * item.quantity,
    0
  );

  const tax = Math.round(itemTotal * 0.025);
  const deliveryCharge = orderType === "takeaway" ? 50 : 0;
  const grandTotal = itemTotal + tax + deliveryCharge;

  const goToInstructions = () => {
    navigate("/instructions", {
      state: {
        cart: cartItems,
        instructions
      }
    });
  };

  const isValidOrder = () => {
    const nameValid = /^[a-zA-Z\s]{2,}$/.test(user.name.trim());
    const mobileValid = /^[6-9]\d{9}$/.test(user.mobile.trim());
    const addressValid = user.address.trim().length >= 10;
    return nameValid && mobileValid && addressValid && orderType && filteredItems.length > 0;
  };

  const submitOrder = async () => {
    if (!isValidOrder()) {
      alert("Please fill all user details correctly and select order type.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: filteredItems,
          user,
          instructions,
          orderType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/status", {
          state: {
            orderId: data.orderId,
            user,
            grandTotal,
            totalPrepTime,
          },
        });
      } else {
        alert(`Error: ${data.error || "Something went wrong"}`);
      }
    } catch (error) {
      alert("Failed to place order. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Good evening</h2>
        <p>Place your order here</p>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search items..."
      />

      <div className={styles.cartItems}>
        {filteredItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <img
              src="/assets/empty-cart.png"
              alt="Empty Cart"
              className={styles.emptyCartImage}
            />
            <p>Your cart is empty</p>
          </div>
        ) : (
          filteredItems.map((item, index) => (
            <div className={styles.cartItem} key={index}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.itemImage}
              />
              <div className={styles.itemDetails}>
                <span className={styles.itemName}>{item.name}</span>
                <p className={styles.itemPrice}>₹{item.price}</p>
                <div className={styles.itemActions}>
                  <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.instructions}>
        <button onClick={goToInstructions}>
          Add Cooking Instructions
        </button>
        {instructions && <p className={styles.preview}>📝 {instructions}</p>}
      </div>

      <div className={styles.orderButtons}>
        <button
          className={orderType === "dinein" ? styles.selected : ""}
          onClick={() => setOrderType("dinein")}
        >
          Dine In
        </button>
        <button
          className={orderType === "takeaway" ? styles.selected : ""}
          onClick={() => setOrderType("takeaway")}
        >
          Take Away
        </button>
      </div>

      <div className={styles.priceSummary}>
        <div className={styles.priceLine}>
          <span>Item Total</span>
          <span>₹{itemTotal.toFixed(2)}</span>
        </div>
        <div className={styles.priceLine}>
          <span>Taxes</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className={styles.priceLine}>
          <span>Delivery Charge</span>
          <span>₹{deliveryCharge.toFixed(2)}</span>
        </div>

        <div className={`${styles.priceLine} ${styles.grandTotal}`}>
          <strong>Grand Total</strong>
          <strong>₹{grandTotal.toFixed(2)}</strong>
        </div>
      </div>

      <div className={styles.userDetails}>
        <label>
          <strong>Name:</strong>
          <input
            type="text"
            value={user.name}
            onChange={e => handleUserChange("name", e.target.value)}
            className={styles.userInput}
            placeholder="Your full name"
          />
          {!/^[a-zA-Z\s]{2,}$/.test(user.name.trim()) && (
            <small className={styles.errorText}>Enter a valid name (min 2 letters)</small>
          )}
        </label>

        <label>
          <strong>Mobile:</strong>
          <input
            type="text"
            value={user.mobile}
            onChange={e => handleUserChange("mobile", e.target.value)}
            className={styles.userInput}
            placeholder="10-digit mobile number"
          />
          {!/^[6-9]\d{9}$/.test(user.mobile.trim()) && (
            <small className={styles.errorText}>Enter a valid 10-digit mobile number</small>
          )}
        </label>

        <label>
          <strong>Address:</strong>
          <input
            type="text"
            value={user.address}
            onChange={e => handleUserChange("address", e.target.value)}
            className={styles.userInput}
            placeholder="Complete delivery address"
          />
          {user.address.trim().length < 10 && (
            <small className={styles.errorText}>Address must be at least 10 characters</small>
          )}
        </label>
      </div>

      {user.address && (
        <div className={styles.deliveryInfo}>
          <p><strong>Delivery in {totalPrepTime} mins</strong></p>
          <p><strong>Delivery at Home -</strong> {user.address}</p>
        </div>
      )}

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={submitOrder}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Submit Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
