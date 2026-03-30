import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BookRoom() {

  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;
  const room = data?.room;
  const hotel = data?.hotel;

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    checkin: "",
    checkout: ""
  });

  // 🧠 calculate days
  const getDays = () => {
    if (!form.checkin || !form.checkout) return 0;

    const start = new Date(form.checkin);
    const end = new Date(form.checkout);

    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const days = getDays();
  const total = days * (room?.price || 0);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.checkin || !form.checkout) {
      alert("Please fill all fields");
      return;
    }

    if (form.checkout <= form.checkin) {
      alert("Checkout must be after check-in");
      return;
    }

    const bookings =
      JSON.parse(localStorage.getItem("bookings") || "[]");

    const newBooking = {
      id: Date.now(),
      hotel: hotel?.name,
      room: room?.type,
      price: room?.price,
      days,
      total,
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

        {/* HEADER */}
        <h2 style={title}>Confirm your stay</h2>

        <div style={hotelBox}>
          <p style={hotelName}>{hotel?.name}</p>
          <p style={roomType}>{room?.type}</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Your name"
            onChange={handleChange}
            style={input}
          />

          <input
            name="phone"
            placeholder="Phone number"
            onChange={handleChange}
            style={input}
          />

          <div style={dateRow}>
            <input
              type="date"
              name="checkin"
              min={today}
              onChange={handleChange}
              style={input}
            />

            <input
              type="date"
              name="checkout"
              min={form.checkin || today}
              onChange={handleChange}
              style={input}
            />
          </div>

          {/* 💰 PRICE SUMMARY */}
          {days > 0 && (
            <div style={summary}>
              <p>₹{room?.price} × {days} nights</p>
              <h3>Total: ₹{total}</h3>
            </div>
          )}

          <button style={btn}>
            Confirm Booking
          </button>

        </form>

      </div>

    </div>
  );
}

export default BookRoom;

//
// 🎨 STYLES
//

const page = {
  background: "#f7f7f7",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const card = {
  background: "white",
  padding: "30px",
  borderRadius: "16px",
  width: "380px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
};

const title = {
  marginBottom: "15px"
};

const hotelBox = {
  marginBottom: "20px"
};

const hotelName = {
  fontWeight: "600"
};

const roomType = {
  color: "#666",
  fontSize: "14px"
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  fontSize: "14px"
};

const dateRow = {
  display: "flex",
  gap: "10px"
};

const summary = {
  background: "#fafafa",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
  textAlign: "center"
};

const btn = {
  background: "#ff385c",
  color: "white",
  border: "none",
  padding: "12px",
  width: "100%",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold"
};