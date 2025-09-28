import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleCatalogClick = () => {
    navigate("/catalog");
  };

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Find your perfect rental car</h1>
      <p className={styles.subtitle}>
        Reliable and budget-friendly rentals for any journey
      </p>
      <button onClick={handleCatalogClick} className={styles.catalogBtn}>
        View Catalog
      </button>
      {/* Тут буде банер із макета */}
    </div>
  );
};

export default HomePage;
