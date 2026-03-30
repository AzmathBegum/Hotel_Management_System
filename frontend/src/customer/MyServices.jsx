import { useEffect, useState } from "react";

function MyServices() {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/services");

        if (!res.ok) {
          setError("Failed to load services");
          setLoading(false);
          return;
        }

        const data = await res.json();
        console.log("API DATA:", data);

        setServices(data);

      } catch (err) {
        console.log(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();

  }, []);

  // 🧠 STATUS LOGIC
  const getStatus = (s) => {
    if (!s.date) return "Requested";

    const today = new Date();
    const serviceDate = new Date(s.date);

    const diff = (today - serviceDate) / (1000 * 60 * 60 * 24);

    if (diff > 1) return "Completed";
    if (diff > 0) return "In Progress";
    return "Requested";
  };

  // 🎨 STATUS COLOR
  const getStatusStyle = (status) => {
    if (status === "Completed") return { background: "#4caf50" };
    if (status === "In Progress") return { background: "#2196f3" };
    return { background: "#ff9800" };
  };

  return (
    <div style={page}>

      <h2 style={title}>My Services</h2>

      {/* LOADING */}
      {loading && <p style={center}>Loading...</p>}

      {/* ERROR */}
      {error && <p style={center}>{error}</p>}

      {/* EMPTY */}
      {!loading && !error && services.length === 0 && (
        <p style={center}>No service requests yet</p>
      )}

      {/* DATA */}
      {!loading && !error && services.length > 0 && (

        <div style={list}>

          {services.map((s, index) => {

            // 🧠 SAFE DATA HANDLING
            const serviceName = s.service || s.serviceName || "Service";
            const type = s.type || s.description || "Not specified";
            const price = s.total || s.price || 0;
            const date = s.date || "No date";

            const statusText = getStatus(s);

            return (
              <div key={s.id || index} style={card}>

                <div>
                  <h3>{serviceName}</h3>
                  <p style={typeStyle}>{type}</p>
                  <p style={dateStyle}>{date}</p>
                </div>

                <div style={right}>

                  <span style={{ ...status, ...getStatusStyle(statusText) }}>
                    {statusText}
                  </span>

                  <p style={priceStyle}>₹{price}</p>

                </div>

              </div>
            );
          })}

        </div>

      )}

    </div>
  );
}

export default MyServices;

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

const center = {
  textAlign: "center",
  color: "#777"
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  maxWidth: "800px",
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
  gap: "8px"
};

const status = {
  color: "white",
  padding: "5px 10px",
  borderRadius: "20px",
  fontSize: "12px"
};

const typeStyle = {
  color: "#666",
  fontSize: "14px"
};

const dateStyle = {
  fontSize: "12px",
  color: "#999"
};

const priceStyle = {
  fontWeight: "bold"
};