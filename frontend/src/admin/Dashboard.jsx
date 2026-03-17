
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { getStaff } from "../hotelservices/staffService";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function Dashboard() {

  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await getStaff();
        setStaff(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStaff();
  }, []);

  /* Dashboard Cards */

  const stats = [
    { title: "Total Staff", value: staff.length },
    { title: "Available Rooms", value: 45 },
    { title: "Booked Rooms", value: 75 },
    { title: "Total Bookings", value: 90 }
  ];

  /* Graph Data */

  const data = {
    labels: ["Available", "Booked"],
    datasets: [
      {
        label: "Rooms",
        data: [45, 75],
        backgroundColor: ["#2bb673", "#ff6b6b"]
      }
    ]
  };

  return (
    <Layout>

      <h1>Dashboard</h1>

      {/* Stats Cards */}

      <div style={cardGrid}>
        {stats.map((item, index) => (
          <div key={index} style={card}>
            <h3>{item.title}</h3>
            <h2>{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Graph + Recent Staff */}

      <div style={bottomSection}>

        {/* Graph */}

        <div style={box}>
          <h3>Room Status</h3>

          <div style={{ height: "250px" }}>
            <Bar
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
              }}
            />
          </div>
        </div>

        {/* Recent Staff */}

        <div style={box}>
          <h3>Recent Staff</h3>

          <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
            {staff.slice(0,5).map((s) => (
              <li key={s._id}>
                {s.name} - {s.role}
              </li>
            ))}
          </ul>

        </div>

      </div>

    </Layout>
  );
}

export default Dashboard;


/* Styles */

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: "20px",
  marginTop: "20px"
};

const card = {
  background: "#17b6c8",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center"
};

const bottomSection = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "20px",
  marginTop: "30px"
};

const box = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)"
};

