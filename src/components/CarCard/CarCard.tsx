import { useNavigate } from 'react-router-dom';
import { useFavoriteStore } from '../../store/useFavoriteStore';
import type { Car } from '../../types';
import styles from './CarCard.module.css';

// ВАЖЛИВО: Імпортуємо унікальні іконки
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface CarCardProps {
  car: Car;
}

const formatMileage = (mileage: number) =>
  mileage.toLocaleString('en-US').replace(/,/g, ' ') + ' km';

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavoriteStore();
  const isFavorite = favorites.includes(car.id);

  const handleReadMore = () => {
    navigate(`/catalog/${car.id}`);
  };

  // Оновлення для відображення City, Country та Rental Company, як у макеті
  const addressParts = car.address.split(',');
  const city = addressParts[1]?.trim() || 'N/A';
  const country = addressParts.pop()?.trim() || 'N/A';

  return (
    <li className={styles.rentalCarItem}>
      {/* Обгортка зображення та кнопки Улюблене */}
      <div className={styles.imageAndToggleWrapper}>
        <img
          src={car.img}
          alt={`${car.brand} ${car.model} ${car.year}`}
          className={styles.carImage}
        />

        {/* Кнопка Улюблене: замінюємо емодзі на унікальні іконки */}
        <button
          className={`${styles.favoriteButton} ${isFavorite ? styles.isFavorite : ''}`}
          onClick={() => toggleFavorite(car.id)}
        >
          {isFavorite ? (
            <FaHeart className={styles.heartIcon} />
          ) : (
            <FaRegHeart className={styles.heartIcon} />
          )}
        </button>
      </div>

      {/* Заголовок та Ціна */}
      <div className={styles.titleAndRateBar}>
        <h2 className={styles.carHeading}>
          {car.brand} <span className={styles.modelHighlight}>{car.model}</span>, {car.year}
        </h2>
        <p className={styles.dailyRate}>${car.rentalPrice}</p> {/* Ціна без '/h' */}
      </div>

      {/* Додаткова інформація  */}
      <p className={styles.carSubInfo}>
        <span>
          {city} | {country} | {car.rentalCompany} |
        </span>
        <span>
          {' '}
          {car.type} | {formatMileage(car.mileage)}{' '}
        </span>
      </p>

      {/* Кнопка "Read More" */}
      <button className={styles.detailsActionButton} onClick={handleReadMore}>
        Read more
      </button>
    </li>
  );
};

export default CarCard;
