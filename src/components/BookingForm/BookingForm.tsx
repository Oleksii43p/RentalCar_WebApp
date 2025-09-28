import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBooking } from "../../api/carsApi";
import styles from "./BookingForm.module.css";

interface BookingFormProps {
  carId: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ carId }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name || !phone || !startDate || !endDate) {
      toast.error("Будь ласка, заповніть усі поля.");
      setIsSubmitting(false);
      return;
    }

    try {
      const data = {
        carId,
        customerName: name,
        customerPhone: phone,
        startDate,
        endDate,
      };

      // Надсилання даних на API
      await createBooking(data);

      toast.success("Бронювання успішно оформлене!");

      // Скидання форми
      setName("");
      setPhone("");
      setStartDate("");
      setEndDate("");
    } catch (error) {
      toast.error("Не вдалось оформити бронювання. Спробуйте пізніше.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Оформить бронирование</h2>

        <input
          type="text"
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <input
          type="tel"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={styles.input}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={styles.input}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className={styles.input}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitBtn}
        >
          {isSubmitting ? "Отправка..." : "Забронировать"}
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default BookingForm;
