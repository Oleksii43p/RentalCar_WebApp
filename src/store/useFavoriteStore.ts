import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteState {
  favorites: string[];
  toggleFavorite: (carId: string) => void;
  isFavorite: (carId: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (carId) =>
        set((state) => {
          if (state.favorites.includes(carId)) {
            return { favorites: state.favorites.filter((id) => id !== carId) };
          } else {
            return { favorites: [...state.favorites, carId] };
          }
        }),

      isFavorite: (carId) => get().favorites.includes(carId), // Метод для перевірки у компоненті
    }),
    {
      name: "rentalcar-favorites",
    }
  )
);
