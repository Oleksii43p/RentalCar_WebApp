import { useEffect } from "react";
import { useCarStore } from "../../store/useCarStore";
import CarCard from "../../components/CarCard/CarCard";
import FilterBar from "../../components/FilterBar/FilterBar";
import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
  const { cars, isLoading, hasMore, fetchInitialCars, loadMoreCars } =
    useCarStore();

  useEffect(() => {
    // Завантаження при першому рендері або при вході на сторінку
    if (cars.length === 0 && !isLoading) {
      fetchInitialCars();
    }
  }, [fetchInitialCars, cars.length, isLoading]);

  return (
    <div className={styles.catalogContainer}>
      <FilterBar />

      {isLoading && cars.length === 0 && <p>Завантаження...</p>}

      <ul className={styles.carList}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </ul>

      {isLoading && cars.length > 0 && <p>Завантаження наступних авто...</p>}

      {hasMore && !isLoading && cars.length > 0 && (
        <button onClick={loadMoreCars} className={styles.loadMoreBtn}>
          Load More
        </button>
      )}

      {!hasMore && cars.length > 0 && (
        <p className={styles.endMessage}>Більше автомобілів немає</p>
      )}

      {!isLoading && cars.length === 0 && (
        <p>Автомобілі не знайдено. Змініть фільтри.</p>
      )}
    </div>
  );
};

export default CatalogPage;
