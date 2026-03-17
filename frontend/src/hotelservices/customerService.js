
import axios from "axios";

const API_URL = "http://localhost:5000/api/customers";

export const getCustomers = () => {
  return axios.get(API_URL);
};

export const addCustomer = (data) => {
  return axios.post(API_URL, data);
};

export const deleteCustomer = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

