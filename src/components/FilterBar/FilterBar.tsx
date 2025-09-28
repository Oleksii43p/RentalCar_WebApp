import React, { useState, useEffect } from "react";
import { useCarStore } from "../../store/useCarStore";
import { fetchBrands } from "../../api/carsApi";
import { cleanNumberInput } from "../../utils/formatters";
import styles from "./FilterBar.module.css";

// Список цін для меню, що випадає (відповідно до API, де price - рядок)
const PRICE_OPTIONS = [
  "30",
  "40",
  "50",
  "60",
  "70",
  "80",
  "90",
  "100",
  "150",
  "200",
];

const FilterBar: React.FC = () => {
  const { filters, setFilters, fetchInitialCars } = useCarStore();

  // Локальний стан даних в інпутах/селектах
  const [localFilters, setLocalFilters] = useState({
    brand: filters.brand || "",
    rentalPrice: filters.rentalPrice || "",
    mileageFrom: "",
    mileageTo: "",
  });

  const [brands, setBrands] = useState<string[]>([]);
  const [isLoadingBrands, setIsLoadingBrands] = useState(true);

  // 1. Завантаження списку брендів під час монтування
  useEffect(() => {
    const loadBrands = async () => {
      try {
        const brandList = await fetchBrands();
        setBrands(brandList);
      } catch (error) {
        console.error("Не удалось загрузить бренды:", error);
      } finally {
        setIsLoadingBrands(false);
      }
    };
    loadBrands();
  }, []);

  // 2. Обробник зміни полів форми
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Обробник відправлення форми
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Перетворення пробігу та видалення зайвих полів
    const finalFilters = {
      brand: localFilters.brand,
      rentalPrice: localFilters.rentalPrice,
      // API вимагає minMileage/maxMileage (без пропусків)
      minMileage: localFilters.mileageFrom
        ? cleanNumberInput(localFilters.mileageFrom)
        : undefined,
      maxMileage: localFilters.mileageTo
        ? cleanNumberInput(localFilters.mileageTo)
        : undefined,
    };

    // Залишаємо лише ті поля, які мають значення (для чистоти запиту)
    const activeFilters = Object.fromEntries(
      Object.entries(finalFilters).filter(([, value]) => value)
    );

    // Встановлення фільтрів у Zustand та запуск нового завантаження
    setFilters(activeFilters);
    fetchInitialCars(); // Запуск фетчинга с новыми фильтрами и page=1
  };

  return (
    <form className={styles.filterForm} onSubmit={handleSubmit}>
      <div className={styles.filterGroup}>
        <label htmlFor="brand">Car Brand</label>
        <select
          id="brand"
          name="brand"
          value={localFilters.brand}
          onChange={handleChange}
          disabled={isLoadingBrands}
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="rentalPrice">Price / 1 hour</label>
        <select
          id="rentalPrice"
          name="rentalPrice"
          value={localFilters.rentalPrice}
          onChange={handleChange}
        >
          <option value="">All Prices</option>
          {PRICE_OPTIONS.map((price) => (
            <option key={price} value={price}>
              Up to ${price}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="mileageFrom">Car mileage / km</label>
        <div className={styles.mileageInputs}>
          <input
            type="text"
            id="mileageFrom"
            name="mileageFrom"
            placeholder="From"
            value={localFilters.mileageFrom}
            onChange={handleChange}
          />
          <input
            type="text"
            id="mileageTo"
            name="mileageTo"
            placeholder="To"
            value={localFilters.mileageTo}
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit" className={styles.searchBtn}>
        Search
      </button>
    </form>
  );
};

export default FilterBar;
