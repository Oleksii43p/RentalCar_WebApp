import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleCatalogClick = () => {
    navigate('/catalog');
  };

  return (
    <section className={styles.heroBannerSection}>
      <h1 className={styles.heroTitle}>Find your perfect rental car</h1>
      <p className={styles.heroSubtitle}>Reliable and budget-friendly rentals for any journey</p>
      <button onClick={handleCatalogClick} className={styles.ctaButton}>
        View Catalog
      </button>
    </section>
  );
};

export default HomePage;
