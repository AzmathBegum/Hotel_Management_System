
import Layout from "../components/Layout";
import { Bar, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function Reports() {

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue (₹)",
        data: [20000, 35000, 28000, 42000, 38000, 50000],
        backgroundColor: "#17b6c8"
      }
    ]
  };

  const bookingsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Bookings",
        data: [12, 18, 10, 20, 15, 25],
        borderColor: "#17b6c8",
        backgroundColor: "#17b6c8",
        tension: 0.3
      }
    ]
  };

  return (
    <Layout>

      <h2 style={{ marginBottom: "20px" }}>Reports</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px"
        }}
      >

        {/* Revenue Chart */}

        <div style={card}>

          <h4 style={{ marginBottom: "10px" }}>
            Monthly Revenue
          </h4>

          <div style={{ height: "220px" }}>
            <Bar
              data={revenueData}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>

        </div>

        {/* Bookings Chart */}

        <div style={card}>

          <h4 style={{ marginBottom: "10px" }}>
            Bookings Trend
          </h4>

          <div style={{ height: "220px" }}>
            <Line
              data={bookingsData}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>

        </div>

      </div>

    </Layout>
  );
}

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
};

export default Reports;

