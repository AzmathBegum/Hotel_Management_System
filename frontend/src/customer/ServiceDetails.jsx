import { useLocation } from "react-router-dom";
import { useState } from "react";

function ServiceDetails() {

  const location = useLocation();
  const service = location.state || {};

  const [quantities, setQuantities] = useState({});

  const serviceTypes = {
    "Room Service": [
      { type: "Breakfast", price: 300 },
      { type: "Lunch", price: 500 },
      { type: "Dinner", price: 600 }
    ],
    "Laundry": [
      { type: "Washing", price: 100 },
      { type: "Dry Cleaning", price: 200 },
      { type: "Ironing", price: 50 }
    ],
    "Airport Pickup": [
      { type: "Sedan", price: 1200 },
      { type: "SUV", price: 2000 }
    ],
    "Spa": [
      { type: "Massage", price: 1500 },
      { type: "Facial", price: 1200 }
    ]
  };

  const types = serviceTypes[service?.name] || [];

  // ➕ increase
  const increase = (type) => {
    setQuantities({
      ...quantities,
      [type]: (quantities[type] || 0) + 1
    });
  };

  // ➖ decrease
  const decrease = (type) => {
    if (!quantities[type]) return;

    setQuantities({
      ...quantities,
      [type]: quantities[type] - 1
    });
  };

  // 🛒 request service
  const requestService = () => {

    const requests =
      JSON.parse(localStorage.getItem("services") || "[]");

    types.forEach(t => {
      const qty = quantities[t.type] || 0;

      if (qty > 0) {
        requests.push({
          id: Date.now() + Math.random(),
          service: service.name,
          type: t.type,
          quantity: qty,
          price: t.price,
          total: t.price * qty,
          status: "Requested",
          date: new Date().toLocaleDateString()
        });
      }
    });

    localStorage.setItem("services", JSON.stringify(requests));

    alert("Services Requested Successfully!");
  };

  return (
    <div style={page}>

      <div style={card}>

        {/* HEADER */}
        <h2 style={title}>{service.name}</h2>
        <p style={desc}>{service.description}</p>

        {/* OPTIONS */}
        <h3 style={{ marginTop: "20px" }}>Choose Options</h3>

        {types.map((t, i) => {

          const qty = quantities[t.type] || 0;

          return (
            <div key={i} style={row}>

              <div>
                <h4>{t.type}</h4>
                <p style={price}>₹{t.price}</p>
              </div>

              {/* ➕➖ COUNTER */}
              <div style={counter}>
                <button onClick={() => decrease(t.type)} style={countBtn}>-</button>
                <span>{qty}</span>
                <button onClick={() => increase(t.type)} style={countBtn}>+</button>
              </div>

              {/* TOTAL */}
              <div style={total}>
                ₹{t.price * qty}
              </div>

            </div>
          );
        })}

        {/* BUTTON */}
        <button style={mainBtn} onClick={requestService}>
          Request Services
        </button>

      </div>

    </div>
  );
}

export default ServiceDetails;

//
// 🎨 STYLES
//

const page = {
  background: "#f7f7f7",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const card = {
  background: "white",
  padding: "30px",
  borderRadius: "16px",
  width: "500px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
};

const title = {
  marginBottom: "5px"
};

const desc = {
  color: "#666",
  marginBottom: "10px"
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 0",
  borderBottom: "1px solid #eee"
};

const price = {
  color: "#666",
  fontSize: "14px"
};

const counter = {
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const countBtn = {
  background: "#ff385c",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: "6px",
  cursor: "pointer"
};

const total = {
  fontWeight: "bold"
};

const mainBtn = {
  marginTop: "20px",
  width: "100%",
  padding: "12px",
  background: "#ff385c",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold"
};