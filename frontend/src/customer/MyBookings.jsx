import { useState } from "react";

function MyBookings() {

  const [bookings, setBookings] = useState(
    JSON.parse(localStorage.getItem("bookings") || "[]")
  );

  const today = new Date();

  // 🧠 Get booking status
  const getStatus = (b) => {
    const checkin = new Date(b.checkin);
    const checkout = new Date(b.checkout);

    if (today < checkin) return "Upcoming";
    if (today >= checkin && today <= checkout) return "Staying";
    return "Completed";
  };

  // ❌ Cancel booking
  const cancelBooking = (id, checkinDate) => {
    const checkin = new Date(checkinDate);
    const diff = (checkin - today) / (1000 * 60 * 60 * 24);

    if (diff < 2) {
      alert("Cannot cancel within 2 days. Penalty may apply.");
      return;
    }

    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  return (
    <div style={page}>

      <h2 style={title}>My Bookings</h2>

      {bookings.length === 0 ? (
        <p style={empty}>No bookings yet</p>
      ) : (

        <div style={list}>
          {bookings.map(b => {

            const status = getStatus(b);

            return (
              <div key={b.id} style={card}>

                <div>
                  <h3>{b.hotel}</h3>
                  <p>{b.room}</p>
                  <p>{b.checkin} → {b.checkout}</p>
                </div>

                <div style={right}>

                  <span style={statusStyle(status)}>
                    {status}
                  </span>

                  {status === "Upcoming" && (
                    <button
                      style={cancelBtn}
                      onClick={() => cancelBooking(b.id, b.checkin)}
                    >
                      Cancel
                    </button>
                  )}

                </div>

              </div>
            );
          })}
        </div>

      )}

    </div>
  );
}

export default MyBookings;

//
// 🎨 STYLES
//

const page = {
  background: "#f7f7f7",
  minHeight: "100vh",
  padding: "30px"
};

const title = {
  marginBottom: "20px"
};

const empty = {
  textAlign: "center",
  color: "#777"
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  maxWidth: "700px",
  margin: "auto"
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
};

const right = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "10px"
};

const statusStyle = (status) => ({
  padding: "5px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  color: "white",
  background:
    status === "Upcoming"
      ? "#ff9800"
      : status === "Staying"
      ? "#4caf50"
      : "#9e9e9e"
});

const cancelBtn = {
  background: "#ff385c",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer"
};