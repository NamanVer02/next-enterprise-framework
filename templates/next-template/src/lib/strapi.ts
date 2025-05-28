import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

const strapiApi = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token if available
strapiApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default strapiApi;

// API functions for Aurora GT-S data
export const carsApi = {
  // Get all cars
  getCars: () => strapiApi.get("/cars?populate=*"),

  // Get single car
  getCar: (id: string) => strapiApi.get(`/cars/${id}?populate=*`),

  // Get features
  getFeatures: () => strapiApi.get("/features?populate=*"),

  // Get testimonials
  getTestimonials: () => strapiApi.get("/testimonials?populate=*"),

  // Get pricing packages
  getPricingPackages: () => strapiApi.get("/pricing-packages?populate=*"),
};
