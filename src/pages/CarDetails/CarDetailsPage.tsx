import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCarDetails } from "../../api/carsApi";
import BookingForm from "../../components/BookingForm/BookingForm";
import styles from "./CarDetailsPage.module.css";
import type { Car } from "../../types";

const CarDetailsPage = () => {
  const { carId } = useParams<{ carId: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!carId) return;

    const loadDetails = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCarDetails(carId);
        setCar(data);
      } catch (error) {
        console.error("Ошибка загрузки деталей:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDetails();
  }, [carId]);

  if (isLoading) return <p>Завантаження деталей автомобіля...</p>;
  if (!car) return <p>Автомобіль не знайдено.</p>;

  return (
    <div className={styles.detailsContainer}>
      <h1>
        {car.brand} {car.model}
      </h1>
      <img src={car.img} alt={car.model} className={styles.mainImage} />

      <p>{car.description}</p>

      <div className={styles.conditions}>
        <h2>Rental Conditions:</h2>
        <ul>
          {car.rentalConditions.map((condition, index) => (
            <li key={index}>{condition}</li>
          ))}
        </ul>
      </div>

      <BookingForm carId={car.id} />
    </div>
  );
};

export default CarDetailsPage;
