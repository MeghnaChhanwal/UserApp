
import React from "react";
import styles from "../styles/Category.module.css";

const categories = ["Drink", "Burger", "Pizza", "French Fries", "Veggies"];

export default function CategoryTabs({ selectedCategory, onSelectCategory }) {
  return (
    <div className={styles.tabs}>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`${styles.tab} ${selectedCategory === cat ? styles.active : ""}`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
