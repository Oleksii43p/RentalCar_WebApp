// 1. Форматує число пробігом (15000 -> 15000) і додає 'km'
export const formatMileage = (mileage: number): string => {
  return mileage.toLocaleString("en-US").replace(/,/g, " ") + " km";
};

// 2. Видаляє пробіли з рядка (для відправки в API: '50000' -> '50000')
export const cleanNumberInput = (input: string): string => {
  return input.replace(/ /g, "");
};

// 3. Форматування ціни: '40' -> '$40'
export const formatPrice = (price: string): string => {
  return `$${price}`;
};
