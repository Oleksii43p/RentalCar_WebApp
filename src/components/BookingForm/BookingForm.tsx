import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { createBooking } from '../../api/carsApi';
import { enGB } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './BookingForm.module.css';

// Реєструємо локаль для DatePicker (формат 'en-GB' для dd/MM/yyyy)
registerLocale('en-GB', enGB);

interface BookingFormProps {
  carId: string;
}

// Унікальний стан для керування датами
interface FormState {
  name: string;
  email: string;
  comment: string;
  startDate: Date | null;
  endDate: Date | null;
}

const BookingForm: React.FC<BookingFormProps> = ({ carId }) => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    comment: '',
    startDate: null,
    endDate: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Обробник зміни для текстових полів
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Обробник зміни для DatePicker
  const handleDateChange = (date: Date | null, field: 'startDate' | 'endDate') => {
    setFormData((prev) => ({ ...prev, [field]: date }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.startDate || !formData.endDate) {
      toast.error('Будь ласка, заповніть усі обов’язкові поля (включно з датами).');
      setIsSubmitting(false);
      return;
    }

    try {
      // Форматуємо дати у стандартний рядок YYYY-MM-DD для API
      const formatApiDate = (date: Date) => new Intl.DateTimeFormat('en-CA').format(date);

      const data = {
        carId,
        customerName: formData.name,
        customerEmail: formData.email,
        startDate: formatApiDate(formData.startDate!),
        endDate: formatApiDate(formData.endDate!),
        comment: formData.comment,
      };

      await createBooking(data);

      // Надсилання даних на API
      // await createBooking(data);

      toast.success('Бронювання успішно оформлене!');

      // Скидання форми
      setFormData({
        name: '',
        email: '',
        comment: '',
        startDate: null,
        endDate: null,
      });
    } catch (error) {
      console.error('Помилка при спробі бронювання:', error);
      toast.error('Не вдалось оформити бронювання. Спробуйте пізніше.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // ВИПРАВЛЕНО: Використання React-фрагменту для обгортки кількох кореневих елементів
    <>
      {/* 1. Основна форма бронювання */}
      <form onSubmit={handleSubmit} className={styles.reservationForm}>
        {/* Блок заголовка */}
        <div className={styles.formHeaderBlock}>
          <h2 className={styles.mainTitle}>Book your car now</h2>
          <p className={styles.captionText}>Stay connected! We are always ready to help you.</p>
        </div>

        {/* Контейнер полів введення */}
        <div className={styles.fieldContainer}>
          {/* Поле 1: Ім'я */}
          <input
            type="text"
            name="name"
            placeholder="Name*"
            value={formData.name}
            onChange={handleTextChange}
            className={styles.textField}
            required
          />

          {/* Поле 2: Email */}
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleTextChange}
            className={styles.textField}
            required
          />

          {/* Поле 3: Дата Початку (DatePicker) */}
          {/* Використовуємо <label> для кращої доступності, навіть якщо стилі застосовуються до input */}
          <label className={styles.dateFieldLabel}>
            <DatePicker
              selected={formData.startDate}
              onChange={(date) => handleDateChange(date, 'startDate')}
              selectsStart
              startDate={formData.startDate}
              endDate={formData.endDate}
              minDate={new Date()}
              placeholderText="Дата початку*"
              dateFormat="dd.MM.yyyy"
              locale="en-GB"
              required
              className={styles.textField}
              name="startDate"
            />
          </label>

          {/* Поле 4: Дата Закінчення (DatePicker) */}
          <label className={styles.dateFieldLabel}>
            <DatePicker
              selected={formData.endDate}
              onChange={(date) => handleDateChange(date, 'endDate')}
              selectsEnd
              startDate={formData.startDate}
              endDate={formData.endDate}
              minDate={formData.startDate || new Date()}
              placeholderText="Дата закінчення*"
              dateFormat="dd.MM.yyyy"
              locale="en-GB"
              required
              className={styles.textField}
              name="endDate"
            />
          </label>

          {/* Поле 5: Коментар */}
          <textarea
            name="comment"
            placeholder="Коментар"
            value={formData.comment}
            onChange={handleTextChange}
            rows={3}
            className={styles.commentField}
          />
        </div>

        {/* Кнопка Надсилання */}
        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
          {isSubmitting ? 'Надсилаємо...' : 'Send'}
        </button>
      </form>

      {/* 2. Контейнер для повідомлень*/}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default BookingForm;
