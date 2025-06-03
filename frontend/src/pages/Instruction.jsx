
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/Instruction.module.css";

const Instructions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [instructions, setInstructions] = useState(location.state?.instructions || "");

  const handleNext = () => {
    const cartState = location.state || {};
    navigate("/cart", {
      state: {
        ...cartState,
        instructions,
      },
    });
  };

  return (
    <div className={styles.container}>
      <h3>Add Cooking Instructions</h3>
      <p>
        The restaurant will try its best to follow your request. However,
        refunds or cancellations in this regard won’t be possible.
      </p>
      <textarea
        className={styles.textarea}
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Type your instructions here..."
      />
      <div className={styles.actions}>
        <button onClick={() => navigate(-1)}>Cancel</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Instructions;
