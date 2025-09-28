import { create } from "zustand";
import { fetchCars } from "../api/carsApi";
import type { Car, CarSearchParams } from "../types";

// Стан та дії
interface CarState {
  cars: Car[];
  page: number;
  isLoading: boolean;
  hasMore: boolean;
  filters: Partial<CarSearchParams>;

  setFilters: (newFilters: Partial<CarSearchParams>) => void;
  fetchInitialCars: () => Promise<void>;
  loadMoreCars: () => Promise<void>;
}

export const useCarStore = create<CarState>((set, get) => ({
  cars: [],
  page: 1,
  isLoading: false,
  hasMore: true,
  filters: {}, // Спочатку порожні фільтри

  // Дія 1: Встановлення фільтрів та скидання стану
  setFilters: (newFilters) =>
    set({
      filters: newFilters,
      cars: [], // Скидання попередніх результатів
      page: 1,
      hasMore: true,
    }),

  // Дія 2: Перше завантаження або завантаження після фільтрації
  fetchInitialCars: async () => {
    set({ isLoading: true });
    set({ cars: [], page: 1, hasMore: true });

    const currentFilters = get().filters;
    const params: CarSearchParams = {
      page: 1,
      limit: 12, // Орієнтовний ліміт пагінації
      ...currentFilters,
    };

    try {
      const data = await fetchCars(params);
      set({
        cars: data,
        page: 1,
        isLoading: false,
        hasMore: data.length === params.limit, // Перевірка на кінець списку
      });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  // Дія 3: Завантаження додаткових карток (Load More)
  loadMoreCars: async () => {
    if (!get().hasMore || get().isLoading) return;

    set({ isLoading: true });
    const nextPage = get().page + 1;
    const currentFilters = get().filters;

    const params: CarSearchParams = {
      page: nextPage,
      limit: 12,
      ...currentFilters,
    };

    try {
      const newCars = await fetchCars(params);
      set((state) => ({
        cars: [...state.cars, ...newCars],
        page: nextPage,
        isLoading: false,
        hasMore: newCars.length === params.limit,
      }));
    } catch (error) {
      set({ isLoading: false });
    }
  },
}));
