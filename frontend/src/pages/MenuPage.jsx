import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import getGreeting from "../utils/Greeting";
import styles from "../styles/MenuPage.module.css";

const vegIcon = "/assets/logo/veg.png";     
const nonVegIcon = "/assets/logo/nonveg.png";

const allItems = {
  Pizza: [
    { name: "Cheese Pizza", price: 150, image: "/assets/pizza/cheese.jpeg", type: "veg", prepTime: 15 },
    { name: "Double Cheese Pizza", price: 260, image: "/assets/pizza/Doublecheese.jpg", type: "veg", prepTime: 15 },
    { name: "Paneer & Capsicum Pizza", price: 150, image: "/assets/pizza/Capsicum.jpeg", type: "veg", prepTime: 15 },
    { name: "Onion Pizza", price: 110, image: "/assets/pizza/onion.jpeg", type: "veg", prepTime: 15 },
    { name: "Peppy Paneer Pizza", price: 125, image: "/assets/pizza/Peppy.jpg", type: "veg", prepTime: 15 },
    { name: "Golden Corn Pizza", price: 225, image: "/assets/pizza/corn.jpeg", type: "veg", prepTime: 15 },
    { name: "Paneer Makhani Pizza", price: 215, image: "/assets/pizza/makhani.jpg", type: "veg", prepTime: 15},
    { name: "Spiced Double Chicken Pizza", price: 150, image: "/assets/pizza/spiced.jpg", type: "nonveg", prepTime: 25 },
    { name: "Kadhai Chicken Pizza", price: 100, image: "/assets/pizza/kadhaiChickenPizza.webp", type: "nonveg", prepTime: 25 },
    { name: "Blazing Chicken & Paprika Pizza", price: 150, image: "/assets/pizza/cheese.jpeg", type: "nonveg", prepTime: 25 },
    { name: "Chicken Sausage Pizza", price: 100, image: "/assets/pizza/sausage.jpg", type: "nonveg", prepTime: 25 },
  ],
  Burger: [
    { name: "Classic Veggie Burger", price: 79, image: "/assets/burger/classic.jpg", type: "veg", prepTime: 15 },
    { name: "Paneer Tikka Burger", price: 120, image: "/assets/burger/tandoor.jpg", type: "veg", prepTime: 15 },
    { name: "Makhani Paneer Burger", price: 179, image: "/assets/burger/paneer.png", type: "veg", prepTime: 15 },
    { name: "Cheesy Crunch Burger", price: 140, image: "/assets/burger/cheese.jpg", type: "veg", prepTime: 15 },
    { name: "Veg Makhani Burst Burger", price: 125, image: "/assets/burger/paneers.jpg", type: "veg", prepTime: 15 },
    { name: "Crispy Veg Double Patty Burger", price: 110, image: "/assets/burger/b.jpg", btype: "veg", prepTime: 15 },
    { name: "Cheese Chicken Burger", price: 135, image: "/assets/burger/cheese.jpg", type: "nonveg", prepTime: 15 },
    { name: "Chicken Makhani Burst Burger", price: 200, image: "/assets/burger/chick.jpg", type: "nonveg", prepTime: 15 },
    { name: "Chicken Tandoori Burger", price: 179, image: "/assets/burger/tandoor.jpg", type: "nonveg", prepTime: 15 },
    { name: "Crispy Chicken Burger", price: 160, image: "/assets/burger/crispy.jpg", type: "nonveg", prepTime: 15 },
  ],
  Fries: [
    { name: "Classic Fries", price: 70, image: "/assets/fries/Classic.jpg", type: "veg", prepTime:10 },
    { name: "Cheese Fries", price: 80, image: "/assets/fries/Cheese.jpeg", type: "veg", prepTime: 10 },
    { name: "Spicy Fries", price: 90, image: "/assets/fries/Spicy.jpg", type: "veg", prepTime: 10 },
    { name: "Saucy Fries", price: 85, image: "/assets/fries/Saucy.jpg", type: "veg", prepTime: 10 },
    { name: "Garlic Fries", price: 80, image: "/assets/fries/Garlic.jpg", type: "veg", prepTime: 10 },
    { name: "Peri Peri Fries", price: 90, image: "/assets/fries/peri.jpeg", type: "veg", prepTime: 10 },
    { name: "Salted Fries", price: 70, image: "/assets/fries/salted.jpg", type: "veg", prepTime: 10 },
    { name: "Masala Fries", price: 80, image: "/assets/fries/masala.jpg", type: "veg", prepTime: 10 },
  ],
  Drink: [
    { name: "Cold Chocolate", price: 100, image: "/assets/drinks/coldchocolate.jpg", type: "veg", prepTime: 10 },
    { name: "Pepsi-500ml", price: 75, image: "/assets/drinks/pepsi.jpg", type: "veg", prepTime: 1 },
    { name: "Sprite-500ml", price: 40, image: "/assets/drinks/sprite.jpg", type: "veg", prepTime: 1 },
    { name: "Maaza-500ml", price: 40, image: "/assets/drinks/maaza.jpg", type: "veg", prepTime: 1 },
    { name: "Thick Cold Coffee", price: 40, image: "/assets/drinks/Thik.jpg", type: "veg", prepTime: 5 },
    { name: "Hot Coffee", price: 50, image: "/assets/drinks/Hot.jpg", type: "veg", prepTime: 5 },
    { name: "Brownie Shake", price: 115, image: "/assets/drinks/b.png", type: "veg", prepTime: 5 },
    { name: "Mango Smoothie", price: 90, image: "/assets/drinks/mango.jpg", type: "veg", prepTime: 5 },
    { name: "Hot Chocolate", price: 100, image: "/assets/drinks/chocalte.jpg", type: "veg", prepTime: 5 },
    { name: "Oreo Milkshake", price: 115, image: "/assets/drinks/oreo.jpg", type: "veg", prepTime: 10 },
  ],
  Dessert: [
    { name: "Choco Lava Cup", price: 119, image: "/assets/dessert/lava.jpg", type: "veg", prepTime: 2 },
    { name: "Choco Chips Pastry", price: 80, image: "/assets/dessert/chips.jpg", type: "veg", prepTime: 2 },
    { name: "Blueberry Cheesecake", price: 240, image: "/assets/dessert/blue.webp", type: "nonveg", prepTime: 2 },
    { name: "Nutella Cheesecake Slice", price: 70, image: "/assets/dessert/nutella.jpg", type: "veg", prepTime: 2 },
    { name: "Double Chocolate Pastry", price: 70, image: "/assets/dessert/double.jpeg", type: "veg", prepTime: 2 },
  ],
  Veggies: [
    { name: "White Pasta", price: 190, image: "/assets/veggies/pasta.jpg", type: "veg", prepTime: 20 },
    { name: "Veg Cutlet", price: 210, image: "/assets/veggies/cutlet.jpg", type: "veg", prepTime: 20 },
    { name: "Hara Bhara Kabab", price: 240, image: "/assets/veggies/hara.jpg", type: "veg", prepTime: 20 },
    { name: "Corn & Cheese", price: 225, image: "/assets/veggies/corn.jpg", type: "veg", prepTime: 20 },
    { name: "Grilled Paneer", price: 260, image: "/assets/veggies/grilled.jpg", type: "veg", prepTime: 20 },
    { name: "Chicken Manchurian", price: 200, image: "/assets/veggies/non.jpg", type: "nonveg", prepTime: 20 },
    { name: "Chicken Pepper", price: 140, image: "/assets/veggies/chicken.jpg", type: "nonveg", prepTime: 20 },
  ],
};
const categories = Object.keys(allItems);

const MenuPage = () => {
  const [search, setSearch] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const greetMsg = getGreeting();

  const allFlattenedItems = Object.entries(allItems).flatMap(([category, items]) =>
    items.map(item => ({ ...item, category }))
  );

  const filteredItems = allFlattenedItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesVeg = !vegOnly || item.type === "veg";
    return matchesSearch && matchesCategory && matchesVeg;
  });

  const addToCart = item => {
    setCart(prevCart => {
      const index = prevCart.findIndex(i => i.name === item.name);
      if (index !== -1) {
        const updated = [...prevCart];
        updated[index] = {
          ...updated[index],
          quantity: (updated[index].quantity || 1) + 1,
        };
        return updated;
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.greeting}>{greetMsg}, what would you like to eat?</h2>

        <SearchBar 
          search={search} 
          setSearch={setSearch} 
          vegOnly={vegOnly} 
          setVegOnly={setVegOnly} 
        />

        <div className={styles.categoryScroll}>
          <button
            className={`${styles.categoryButton} ${activeCategory === "All" ? styles.active : ""}`}
            onClick={() => setActiveCategory("All")}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`${styles.categoryButton} ${activeCategory === cat ? styles.active : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

       
        <div className={styles.grid}>
          {filteredItems.map((item, index) => (
            <div key={index} className={styles.itemCard}>
              <img src={item.image} alt={item.name} className={styles.image} />
              <div className={styles.cardContent}>
                <p className={styles.itemName}>
                  {item.name}{" "}
                  <img 
                    src={item.type === "veg" ? vegIcon : nonVegIcon} 
                    alt={item.type} 
                    className={styles.vegIcon} 
                  />
                </p>
                <p className={styles.price}>₹{item.price}</p>
                <button className={styles.addButton} onClick={() => addToCart(item)}>
                  Add +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

  
      {cart.length > 0 && (
  <div className={styles.cartBar}>
    <button 
      className={styles.cartButton} 
      onClick={() => navigate("/cart", { state: { cart } })}
    >
       View Cart • {cart.reduce((sum, i) => sum + (i.quantity || 1), 0)} item
      {cart.reduce((sum, i) => sum + (i.quantity || 1), 0) > 1 ? "s" : ""}
      <span className={styles.cartTotal}>
        &nbsp;• ₹{cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0)}
      </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuPage;