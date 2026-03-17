import { useState, useEffect } from "react";
import Layout from "../components/Layout";

function Bookings() {

  const [bookings, setBookings] = useState([]);

  const [form, setForm] = useState({
    customerId: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: ""
  });

  const API = "http://localhost:8080/api/bookings";

  const loadBookings = async () => {
    try {

      const res = await fetch(API);
      const data = await res.json();

      if (Array.isArray(data)) {
        setBookings(data);
      } else {
        setBookings([]);
      }

    } catch (error) {
      console.log("Error loading bookings:", error);
    }
  };

 useEffect(() => {

  const fetchBookings = async () => {

    try {

      const res = await fetch(API);
      const data = await res.json();

      if (Array.isArray(data)) {
        setBookings(data);
      } else {
        console.log("API did not return array:", data);
        setBookings([]);
      }

    } catch (error) {
      console.log("Error loading bookings:", error);
      setBookings([]);
    }

  };

  fetchBookings();

}, []);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleAddBooking = async (e) => {

    e.preventDefault();

    try {

      await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      setForm({
        customerId: "",
        roomId: "",
        checkInDate: "",
        checkOutDate: ""
      });

      loadBookings();

    } catch (error) {
      console.log("Error creating booking:", error);
    }

  };

  const handleDelete = async (id) => {

    try {

      await fetch(`${API}/${id}`, {
        method: "DELETE"
      });

      loadBookings();

    } catch (error) {
      console.log("Error deleting booking:", error);
    }

  };

  return (
    <Layout>

      <div style={{ padding: "20px" }}>

        <h2>Bookings</h2>

        <form onSubmit={handleAddBooking} style={formStyle}>

          <input
            type="number"
            name="customerId"
            placeholder="Customer ID"
            value={form.customerId}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="number"
            name="roomId"
            placeholder="Room ID"
            value={form.roomId}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="date"
            name="checkInDate"
            value={form.checkInDate}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="date"
            name="checkOutDate"
            value={form.checkOutDate}
            onChange={handleChange}
            style={inputStyle}
          />

          <button type="submit" style={addBtn}>
            Create Booking
          </button>

        </form>

        <table style={table}>

          <thead>
            <tr>
              <th>Customer</th>
              <th>Room</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {bookings.length === 0 ? (
              <tr>
                <td colSpan="6" align="center">No bookings found</td>
              </tr>
            ) : (

              bookings.map((b) => (

                <tr key={b.bookingId}>

                  <td>{b.customerName}</td>
                  <td>{b.roomNumber}</td>
                  <td>{b.checkInDate}</td>
                  <td>{b.checkOutDate}</td>
                  <td>{b.status}</td>

                  <td>

                    <button
                      style={deleteBtn}
                      onClick={() => handleDelete(b.bookingId)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </Layout>
  );
}

const formStyle = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px"
};

const inputStyle = {
  padding: "8px",
  border: "1px solid #17b6c8",
  borderRadius: "4px"
};

const addBtn = {
  background: "#17b6c8",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "4px",
  cursor: "pointer"
};

const deleteBtn = {
  background: "#ff6b6b",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "4px",
  cursor: "pointer"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

export default Bookings;