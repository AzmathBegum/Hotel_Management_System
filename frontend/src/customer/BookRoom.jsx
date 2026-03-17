
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BookRoom() {

  const location = useLocation();
  const navigate = useNavigate();

  const room = location.state;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    checkin: "",
    checkout: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookings =
      JSON.parse(localStorage.getItem("bookings") || "[]");

    const newBooking = {
      id: Date.now(),
      room: room ? room.type : "Standard Room",
      ...form,
      status: "Confirmed"
    };

    bookings.push(newBooking);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Booking Successful!");

    navigate("/my-bookings");
  };

  return (

    <div style={page}>

      <div style={card}>

        <h2 style={{color:"#17b6c8"}}>Book Room</h2>

        <p style={roomText}>
          Room Selected: <b>{room ? room.type : "Standard Room"}</b>
        </p>

        <form onSubmit={handleSubmit}>

          <label>Name</label>
          <input
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            style={input}
          />

          <label>Phone</label>
          <input
            name="phone"
            placeholder="Enter phone number"
            onChange={handleChange}
            style={input}
          />

          <label>Check-in Date</label>
          <input
            type="date"
            name="checkin"
            onChange={handleChange}
            style={input}
          />
          <small style={hint}>Format: MM/DD/YYYY</small>

          <label style={{marginTop:"10px"}}>Check-out Date</label>
          <input
            type="date"
            name="checkout"
            onChange={handleChange}
            style={input}
          />
          <small style={hint}>Format: MM/DD/YYYY</small>

          <button style={btn}>
            Confirm Booking
          </button>

        </form>

      </div>

    </div>
  );
}

/* Page */

const page = {
  background: "#17b6c8",
  minHeight: "100vh",
  padding: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

/* Card */

const card = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  width: "400px"
};

/* Selected room */

const roomText = {
  marginBottom: "20px",
  fontSize: "15px"
};

/* Inputs */

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  marginBottom: "5px",
  background: "white",
  border: "1px solid #17b6c8",
  borderRadius: "6px"
};

/* Date hint */

const hint = {
  fontSize: "12px",
  color: "#666",
  display: "block",
  marginBottom: "10px"
};

/* Button */

const btn = {
  background: "#17b6c8",
  color: "white",
  border: "none",
  padding: "10px",
  width: "100%",
  borderRadius: "6px",
  cursor: "pointer"
};

export default BookRoom;

