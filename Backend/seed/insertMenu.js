const mongoose = require("mongoose");
const MenuItem = require("./models/MenuItem");

const menuData = {
  starters: [
    {
      name: "Tomato Soup",
      price: 99,
      image: "url-to-image",
      type: "veg",
    },
    {
      name: "Chicken Tikka",
      price: 199,
      image: "url-to-image",
      type: "nonveg",
    },
  ],
  mainCourse: [
    {
      name: "Butter Chicken",
      price: 299,
      image: "url-to-image",
      type: "nonveg",
    },
  ],
};

mongoose
  .connect("mongodb://localhost:27017/restaurantDB")
  .then(async () => {
    await MenuItem.deleteMany(); // clear existing data
    let items = [];
    for (const category in menuData) {
      menuData[category].forEach((item) => {
        items.push({ ...item, category });
      });
    }
    await MenuItem.insertMany(items);
    console.log("Menu data seeded!");
    process.exit();
  })
  .catch((err) => console.error(err));
