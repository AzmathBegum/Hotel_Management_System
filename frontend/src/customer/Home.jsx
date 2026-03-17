
import { Link } from "react-router-dom";

function Home() {

  return (

    <div style={container}>

      {/* Navbar */}

      <div style={navbar}>

        <h2 style={{color:"#17b6c8"}}>Hotel Azure</h2>

        <div style={navLinks}>

          <Link style={link} to="/home">Home</Link>
          <Link style={link} to="/customer-rooms">Rooms</Link>
          <Link style={link} to="/services">Services</Link>
          <Link style={link} to="/my-bookings">My Bookings</Link>
          <Link style={link} to="/my-services">My Services</Link>

        </div>

      </div>

      {/* Hero Section */}

      <div style={hero}>

        <h1>Welcome to Hotel Azure</h1>

        <p>
          Experience comfort, luxury, and the best hospitality.
        </p>

        <Link to="/customer-rooms">
          <button style={bookBtn}>
            Explore Rooms
          </button>
        </Link>

      </div>

      {/* Rooms Section */}

      <div style={section}>

        <h2>Our Rooms</h2>

        <div style={grid}>

          <div style={card}>
            <h3>Deluxe Room</h3>
            <p>Comfortable room with modern amenities.</p>
            <p>₹3000 / night</p>
          </div>

          <div style={card}>
            <h3>Suite</h3>
            <p>Luxury suite with premium facilities.</p>
            <p>₹5000 / night</p>
          </div>

          <div style={card}>
            <h3>Standard Room</h3>
            <p>Affordable and cozy stay.</p>
            <p>₹2000 / night</p>
          </div>

        </div>

      </div>

      {/* Services Section */}

      <div style={section}>

        <h2>Our Services</h2>

        <div style={grid}>

          <div style={card}>Room Service</div>
          <div style={card}>Laundry</div>
          <div style={card}>Airport Pickup</div>
          <div style={card}>Restaurant</div>

        </div>

      </div>

    </div>

  );

}

/* Styles */

const container = {
  fontFamily:"Arial",
  background:"#f5f7fb",
  minHeight:"100vh"
};

const navbar = {
  display:"flex",
  justifyContent:"space-between",
  padding:"15px 40px",
  background:"white",
  boxShadow:"0 2px 6px rgba(0,0,0,0.05)"
};

const navLinks = {
  display:"flex",
  gap:"20px",
  alignItems:"center"
};

/* UPDATED LINK COLOR */

const link = {
  textDecoration:"none",
  color:"#17b6c8",
  fontSize:"14px",
  fontWeight:"600"
};

const hero = {
  textAlign:"center",
  padding:"80px 20px",
  background:"#17b6c8",
  color:"white"
};

const bookBtn = {
  marginTop:"20px",
  padding:"10px 18px",
  border:"none",
  background:"white",
  color:"#17b6c8",
  borderRadius:"6px",
  cursor:"pointer",
  fontWeight:"bold"
};

const section = {
  padding:"40px"
};

const grid = {
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
  gap:"20px",
  marginTop:"20px"
};

const card = {
  background:"white",
  padding:"20px",
  borderRadius:"10px",
  boxShadow:"0 2px 6px rgba(0,0,0,0.05)",
  textAlign:"center"
};

export default Home;

