//Тип для одного автомобіля (Car)

export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

// Тип параметрів запиту GET /cars

export interface CarSearchParams {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
  limit: number;
  page: number;
}

// Тип даних форми бронювання

export interface BookingData {
  carId: string;
  startDate: string;
  endDate: string;
  customerName: string;
  customerEmail: string;
  comment: string;
}

// Тип відповіді про бронювання

export interface BookingResponse {
  orderId: string;
  message: string;
}
