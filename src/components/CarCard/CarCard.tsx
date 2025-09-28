import { useNavigate } from "react-router-dom";
import { useFavoriteStore } from "../../store/useFavoriteStore";
import styles from "./CarCard.module.css";
import type { Car } from "../../types";

interface CarCardProps {
  car: Car;
}

const formatMileage = (mileage: number) =>
  mileage.toLocaleString("en-US").replace(/,/g, " ") + " km"; // 5 000 km

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavoriteStore();
  const isFavorite = favorites.includes(car.id);

  const handleReadMore = () => {
    navigate(`/catalog/${car.id}`); // Переход на страницу деталей
  };

  return (
    <li className={styles.card}>
      <img src={car.img} alt={car.model} className={styles.carImage} />

      <button
        className={styles.favoriteBtn}
        onClick={() => toggleFavorite(car.id)}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <div className={styles.info}>
        <h3>
          {car.brand} {car.model}
        </h3>
        <p>Price: ${car.rentalPrice}/h</p>
      </div>

      <p className={styles.details}>
        {car.address.split(",")[1]} | {car.rentalCompany} | {car.type} |{" "}
        {formatMileage(car.mileage)}
      </p>

      <button className={styles.readMoreBtn} onClick={handleReadMore}>
        Read more
      </button>
    </li>
  );
};

export default CarCard;
