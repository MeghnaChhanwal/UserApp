import React from "react";
import styles from "../styles/SearchBar.module.css";

const SearchBar = ({ search, setSearch, vegOnly, setVegOnly, showVegOnly }) => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search items..."
        className={styles.searchInput}
      />
      
      {showVegOnly && (
        <label className={styles.vegToggle}>
          <input
            type="checkbox"
            checked={vegOnly}
            onChange={(e) => setVegOnly(e.target.checked)}
          />
          Veg Only
        </label>
      )}
    </div>
  );
};

export default SearchBar;
