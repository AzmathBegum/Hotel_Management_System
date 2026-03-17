import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#17b6c8",
    display: "block",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
    fontWeight: "500"
  };

  return (

    <div
      style={{
        width: "220px",
        background: "#ffffff",
        height: "100vh",
        padding: "20px",
        borderRight: "2px solid #17b6c8"
      }}
    >

      {/* Title */}

      <h2 style={{ color: "#17b6c8", marginBottom: "30px" }}>
        🏨 Hotel Admin
      </h2>

      {/* Navigation */}

      <Link to="/dashboard" style={linkStyle}>
        📊 Dashboard
      </Link>

      <Link to="/rooms" style={linkStyle}>
        🛏 Rooms
      </Link>

      <Link to="/bookings" style={linkStyle}>
        📅 Bookings
      </Link>

      <Link to="/payments" style={linkStyle}>
            Payments
      </Link>

      {/* Logout */}

      <button
        onClick={handleLogout}
        style={{
          marginTop: "30px",
          background: "#ff6b6b",
          color: "white",
          border: "none",
          padding: "8px",
          borderRadius: "5px",
          width: "100%",
          cursor: "pointer"
        }}
      >
        🚪 Logout
      </button>

    </div>

  );
}

export default Sidebar;