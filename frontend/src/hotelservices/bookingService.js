
import axios from "axios";

const API_URL = "http://localhost:5000/api/bookings";

export const getBookings = () => {
  return axios.get(API_URL);
};

export const addBooking = (data) => {
  return axios.post(API_URL, data);
};

export const deleteBooking = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

