import { useNavigate } from "react-router-dom";

function Services() {

  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      name: "Room Service",
      description: "Food and beverages delivered to your room",
      icon: "🍽️"
    },
    {
      id: 2,
      name: "Laundry",
      description: "Clothes washing and dry cleaning",
      icon: "🧺"
    },
    {
      id: 3,
      name: "Airport Pickup",
      description: "Transportation from airport to hotel",
      icon: "🚗"
    },
    {
      id: 4,
      name: "Spa",
      description: "Relaxing spa and massage services",
      icon: "💆‍♀️"
    }
  ];

  const openService = async (service) => {

    try {
      await fetch("http://localhost:8080/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          serviceName: service.name,
          description: service.description
        })
      });

      navigate("/service-details", { state: service });

    } catch (error) {
      console.log(error);
      alert("Service request failed");
    }

  };

  return (
    <div style={page}>

      {/* HEADER */}
      <div style={header}>
        <h2>Explore Services</h2>
        <p style={subText}>Enhance your stay with our premium services</p>
      </div>

      {/* GRID */}
      <div style={grid}>
        {services.map(service => (
          <div
            key={service.id}
            style={serviceCard}
            onClick={() => openService(service)}
          >
            <div style={icon}>{service.icon}</div>

            <h3>{service.name}</h3>
            <p style={desc}>{service.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Services;

//
// 🎨 STYLES
//

const page = {
  background: "#f7f7f7",
  minHeight: "100vh",
  padding: "40px"
};

const header = {
  maxWidth: "900px",
  margin: "auto",
  marginBottom: "30px"
};

const subText = {
  color: "#666",
  marginTop: "5px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  maxWidth: "900px",
  margin: "auto"
};

const serviceCard = {
  background: "white",
  padding: "20px",
  borderRadius: "16px",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  transition: "0.3s"
};

const icon = {
  fontSize: "30px",
  marginBottom: "10px"
};

const desc = {
  color: "#666",
  fontSize: "14px"
};