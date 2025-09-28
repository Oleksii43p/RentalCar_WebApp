import { useEffect } from 'react';
import { useCarStore } from '../../store/useCarStore';
import CarCard from '../../components/CarCard/CarCard';
import FilterBar from '../../components/FilterBar/FilterBar';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const { cars, isLoading, hasMore, fetchInitialCars, loadMoreCars } = useCarStore();

  useEffect(() => {
    // Завантаження при першому рендері або при вході на сторінку
    if (cars.length === 0 && !isLoading) {
      fetchInitialCars();
    }
  }, [fetchInitialCars, cars.length, isLoading]);

  if (isLoading && cars.length === 0) {
    return <p className={styles.loaderText}>Loading cars...</p>;
  }

  const noCarsFound = !isLoading && cars.length === 0;

  return (
    <div className={styles.pageContentWrapper}>
      <FilterBar />

      {/* Перевірка, чи не знайдено жодного авто */}
      {noCarsFound && (
        <p className={styles.noResultsMessage}>No cars found. Please adjust your filters.</p>
      )}

      {/* Відображення списку автомобілів */}
      {!noCarsFound && (
        <>
          <ul className={styles.carListGrid}>
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </ul>

          {/* Кнопка "Завантажити більше" */}
          {hasMore && (
            <button onClick={loadMoreCars} disabled={isLoading} className={styles.loadMoreButton}>
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
          )}

          {/* Повідомлення, якщо більше авто немає */}
          {!hasMore && cars.length > 0 && (
            <p className={styles.noMoreCarsMessage}>All cars have been loaded.</p>
          )}
        </>
      )}
    </div>
  );
};

export default CatalogPage;
