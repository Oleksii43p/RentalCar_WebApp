import React, { useMemo } from "react";
import { useFavoriteStore } from "../../store/useFavoriteStore";
import { useCarStore } from "../../store/useCarStore";
import CarCard from "../../components/CarCard/CarCard";
import styles from "./FavoritesPage.module.css";

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavoriteStore();
  const { cars } = useCarStore(); // Використовуємо вже завантажені машини з каталогу

  // Фільтруємо всі завантажені машини, щоб показати лише вибрані
  const favoriteCars = useMemo(() => {
    return cars.filter((car) => favorites.includes(car.id));
  }, [cars, favorites]);

  return (
    <div className={styles.favoritesContainer}>
      <h1>Your Favorite Cars</h1>

      {favorites.length === 0 ? (
        <p className={styles.emptyMessage}>
          У вас поки що немає обраних автомобілів. Додайте їх у каталозі!
        </p>
      ) : (
        <ul className={styles.carList}>
          {favoriteCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
