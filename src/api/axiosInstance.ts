import axios from "axios";

const BASE_URL = "https://car-rental-api.goit.global";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
