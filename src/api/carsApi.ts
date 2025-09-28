import type { Car, CarSearchParams, BookingData, BookingResponse } from '../types';
import axiosInstance from './axiosInstance';

// Тип відповіді API для списку, включаючи пагінацію
interface CarsApiResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

// 1. Завантаження списку автомобілів з фільтрами та пагінацією (GET / cars)
export const fetchCars = async (params: CarSearchParams): Promise<Car[]> => {
  try {
    const response = await axiosInstance.get<CarsApiResponse>('/cars', {
      params,
    });
    return response.data.cars;
  } catch (error) {
    console.error('Помилка завантаження автомобілів:', error);
    throw error;
  }
};

// 2. Завантаження деталей одного автомобіля з ID (GET /cars/{id})
export const fetchCarDetails = async (id: string): Promise<Car> => {
  try {
    const response = await axiosInstance.get<Car>(`/cars/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Помилка завантаження деталей для авто ID: ${id}`, error);
    throw error;
  }
};

// 3. Завантаження списку брендів (GET/brands)
export const fetchBrands = async (): Promise<string[]> => {
  try {
    const response = await axiosInstance.get<string[]>('/brands');
    return response.data;
  } catch (error) {
    console.error('Помилка завантаження брендів:', error);
    throw error;
  }
};

// 4. Надсилання даних бронювання (POST/orders)
export const createBooking = async (data: BookingData): Promise<BookingResponse> => {
  try {
    // Використовуємо /orders за промовчанням
    const response = await axiosInstance.post<BookingResponse>('/orders', data);
    return response.data;
  } catch (error) {
    console.error('Помилка створення бронювання:', error);
    throw error;
  }
};
