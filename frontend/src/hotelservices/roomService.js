
import axios from "axios";

const API_URL = "http://localhost:5000/api/rooms";

export const getRooms = () => {
  return axios.get(API_URL);
};

export const addRoom = (data) => {
  return axios.post(API_URL, data);
};

export const deleteRoom = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

