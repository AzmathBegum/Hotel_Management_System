
import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div style={container}>

      {/* Sidebar */}

      <div style={sidebar}>

        <h2 style={{ fontSize: "18px", marginBottom: "25px" }}>
          Hotel Admin
        </h2>

        <nav style={nav}>
          <Link to="/" style={linkStyle}>Dashboard</Link>
          <Link to="/rooms" style={linkStyle}>Rooms</Link>
          <Link to="/bookings" style={linkStyle}>Bookings</Link>
          <Link to="/customers" style={linkStyle}>Customers</Link>
          <Link to="/payments" style={linkStyle}>Payments</Link>
          <Link to="/reports" style={linkStyle}>Reports</Link>
        </nav>

      </div>

      {/* Main Section */}

      <div style={main}>

        {/* Topbar */}

        <div style={topbar}>
          <span style={{ fontSize: "14px" }}>Hotel Management System</span>
          <span style={{ fontSize: "14px" }}>Admin</span>
        </div>

        {/* Page Content */}

        <div style={content}>
          {children}
        </div>

      </div>

    </div>
  );
}

export default Layout;


/* Styles */

const container = {
  display: "flex",
  height: "100vh",
  overflow: "hidden",
  fontFamily: "Arial"
};

const sidebar = {
  width: "200px",
  background: "#17b6c8",
  color: "white",
  padding: "20px"
};

const nav = {
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const main = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  background: "#ffffff"
};

const topbar = {
  height: "55px",
  background: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
};

const content = {
  flex: 1,
  padding: "20px",
  overflow: "auto"
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "14px"
};

