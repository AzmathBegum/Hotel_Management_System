import { useNavigate, useLocation } from "react-router-dom";

function Rooms() {

  const navigate = useNavigate();
  const location = useLocation();

  const hotel = location.state;

  // 👤 Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.name || "User";

  if (!hotel) return <p>No hotel selected</p>;

  // 🧠 Dynamic pricing
  const generateRooms = (hotel) => {
    let basePrice = (hotel.overall_rating || 3) * 1000;

    if (hotel.address?.toLowerCase().includes("hyderabad")) {
      basePrice += 500;
    }

    return [
      { id: 1, type: "Standard Room", price: Math.round(basePrice) },
      { id: 2, type: "Deluxe Room", price: Math.round(basePrice * 1.5) },
      { id: 3, type: "Suite", price: Math.round(basePrice * 2.2) }
    ];
  };

  const rooms = generateRooms(hotel);

  const handleBook = (room) => {
    navigate("/book-room", { state: { room, hotel } });
  };

  return (
    <div style={page}>

      {/* 🔝 NAVBAR */}
      <div style={navbar}>
        
        {/* 👤 USER NAME */}
        <div style={userBox}>
          👤 {username}
        </div>

        {/* 🔗 NAV LINKS */}
        <div style={navLinks}>
          <span onClick={() => navigate("/home")}>Home</span>
          <span onClick={() => navigate("/services")}>Services</span>
          <span onClick={() => navigate("/my-bookings")}>My Bookings</span>
          <span onClick={() => navigate("/my-services")}>My Services</span>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div style={container}>

        {/* LEFT - IMAGE */}
        <div style={left}>
          <img
            src={hotel.images?.[0]?.thumbnail || "https://via.placeholder.com/500"}
            alt="hotel"
            style={image}
          />
        </div>

        {/* RIGHT - DETAILS */}
        <div style={right}>

          <div style={hotelInfo}>
            <h2>{hotel.name}</h2>
            <p>⭐ {hotel.overall_rating}</p>
            <p>{hotel.address}</p>
          </div>

          <h3>Available Rooms</h3>

          {/* 🛏 SCROLLABLE ROOMS */}
          <div style={roomsContainer}>
            {rooms.map((r) => (
              <div key={r.id} style={roomCard}>
                <div>
                  <h4>{r.type}</h4>
                  <p style={price}>₹{r.price} / night</p>
                </div>

                <button style={btn} onClick={() => handleBook(r)}>
                  Book
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}

export default Rooms;

//
// 🎨 STYLES
//

const page = {
  background: "#f7f7f7",
  height: "100vh",
  display: "flex",
  flexDirection: "column"
};

const navbar = {
  width: "100%",
  height: "60px",
  background: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px",
  boxSizing: "border-box",
  overflow: "hidden",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

const userBox = {
  fontWeight: "600",
  color: "#333",
  whiteSpace: "nowrap"
};

const navLinks = {
  display: "flex",
  gap: "20px",
  cursor: "pointer",
  fontWeight: "500",
  flexWrap: "wrap"
};

const container = {
  display: "flex",
  gap: "20px",
  width: "95%",
  height: "calc(100vh - 60px)",
  margin: "auto"
};

const left = {
  flex: 1
};

const right = {
  flex: 1,
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column"
};

const image = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "12px"
};

const hotelInfo = {
  borderBottom: "1px solid #eee",
  paddingBottom: "10px"
};

const roomsContainer = {
  flex: 1,
  overflowY: "auto"
};

const roomCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px",
  borderBottom: "1px solid #eee"
};

const price = {
  color: "#ff385c",
  fontWeight: "bold"
};

const btn = {
  background: "#ff385c",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};