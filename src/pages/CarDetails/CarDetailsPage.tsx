import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCarDetails } from '../../api/carsApi';
import BookingForm from '../../components/BookingForm/BookingForm';
import styles from './CarDetailsPage.module.css';
import type { Car } from '../../types';

import { SlLocationPin, SlSettings } from 'react-icons/sl';
import { BsCalendar4Week, BsCarFront, BsCheckCircle, BsFuelPump } from 'react-icons/bs';
import { formatMileage } from '../../utils/formatters';

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
        console.error('Помилка завантаження деталей:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDetails();
  }, [carId]);

  if (isLoading) return <p>Завантаження деталей автомобіля...</p>;
  if (!car) return <p>Автомобіль не знайдено.</p>;

  const carAddress = car.address ? car.address.split(',').slice(-2).join(', ').trim() : 'Невідомо';

  return (
    <div className={styles.detailPageWrapper}>
      <div className={styles.infoAndBookingGrid}>
        {/* ЛІВА СТОРІНКА: Зображення та Форма */}
        <div className={styles.leftContentBlock}>
          <div className={styles.mainImageWrapper}>
            <img src={car.img} alt={`${car.brand} ${car.model}`} className={styles.carImage} />
          </div>
          <BookingForm carId={car.id} />
        </div>
        {/* ПРАВА СТОРІНКА: Деталі та Умови */}
        <div className={styles.rightContentBlock}>
          {/* Блок 1: Основні деталі */}
          <div className={styles.mainCarDetails}>
            <div className={styles.titleAndPriceWrap}>
              <h1 className={styles.carMainTitle}>
                {car.brand} {car.model}, {car.year}
              </h1>
              <p className={styles.carIdDisplay}>ID: {car.id.slice(0, 4)}</p>
            </div>

            <div className={styles.locationAndMileageWrap}>
              <p className={styles.carLocation}>
                <SlLocationPin className={styles.mapPinIcon} />
                {carAddress}
              </p>

              <p className={styles.carMileageInfo}>Mileage: {formatMileage(car.mileage)} км</p>
            </div>

            <p className={styles.dailyRentalRate}>
              {/* Ціна оренди */}${car.rentalPrice}
            </p>
            <p className={styles.carFullDescription}>{car.description}</p>
          </div>
          {/* Блок 2: Характеристики та Умови */}
          <div className={styles.carFeaturesBlock}>
            {/* Умови оренди (Rental Conditions) */}
            <div className={styles.featureGroupWrap}>
              <h2 className={styles.groupTitle}>Rental Conditions:</h2>
              <ul className={styles.featureList}>
                {car.rentalConditions.map((condition, index) => (
                  <li key={index} className={styles.featureItem}>
                    <BsCheckCircle className={styles.featureCheckIcon} />
                    {condition}
                  </li>
                ))}
              </ul>
            </div>
            {/* Характеристики авто (Specifications) */}
            <div className={styles.featureGroupWrap}>
              <h2 className={styles.groupTitle}>Car Specifications:</h2>
              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <BsCalendar4Week className={styles.featureIcon} />
                  Year: {car.year}
                </li>

                <li className={styles.featureItem}>
                  <BsCarFront className={styles.featureIcon} />
                  Type: {car.type}
                </li>

                <li className={styles.featureItem}>
                  <BsFuelPump className={styles.featureIcon} />
                  Fuel Consumption: {car.fuelConsumption}
                </li>

                <li className={styles.featureItem}>
                  <SlSettings className={styles.featureIcon} />
                  Engine Size: {car.engineSize}
                </li>
              </ul>
            </div>
            {/* Додаткові функції та аксесуари */}
            <div className={styles.featureGroupWrap}>
              <h2 className={styles.groupTitle}>Accessories and functionalities:</h2>

              <div className={styles.accessoriesAndFunctions}>
                <ul className={styles.featureList}>
                  {car.accessories.map((item, index) => (
                    <li key={index} className={styles.featureItem}>
                      <BsCheckCircle className={styles.featureCheckIcon} />
                      {item}
                    </li>
                  ))}
                </ul>
                <ul className={styles.featureList}>
                  {car.functionalities.map((item, index) => (
                    <li key={index} className={styles.featureItem}>
                      <BsCheckCircle className={styles.featureCheckIcon} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
