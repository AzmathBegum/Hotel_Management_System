const API_URL = "http://localhost:8080/api";

// CUSTOMERS
export const getCustomers = async () => {
  const res = await fetch(`${API_URL}/customers`);
  return res.json();
};

export const addCustomer = async (customer) => {
  const res = await fetch(`${API_URL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(customer)
  });
  return res.json();
};

export const deleteCustomer = async (id) => {
  await fetch(`${API_URL}/customers/${id}`, {
    method: "DELETE"
  });
};


// ROOMS
export const getRooms = async () => {
  const res = await fetch(`${API_URL}/rooms`);
  return res.json();
};

export const addRoom = async (room) => {
  const res = await fetch(`${API_URL}/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(room)
  });
  return res.json();
};


// STAFF
export const getStaff = async () => {
  const res = await fetch(`${API_URL}/staff`);
  return res.json();
};

export const addStaff = async (staff) => {
  const res = await fetch(`${API_URL}/staff`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(staff)
  });
  return res.json();
};


// BOOKINGS
export const getBookings = async () => {
  const res = await fetch(`${API_URL}/bookings`);
  return res.json();
};

export const addBooking = async (booking) => {
  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(booking)
  });
  return res.json();
};