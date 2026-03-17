
import { useState } from "react";
import Layout from "../components/Layout";

function Payments() {

  const [payments, setPayments] = useState([
    { id: 1, bookingId: 101, customer: "John", amount: 5000, status: "Paid" },
    { id: 2, bookingId: 102, customer: "Ali", amount: 3000, status: "Pending" }
  ]);

  const [showModal, setShowModal] = useState(false);

  const [newPayment, setNewPayment] = useState({
    bookingId: "",
    customer: "",
    amount: "",
    status: "Pending"
  });

  const handleChange = (e) => {
    setNewPayment({
      ...newPayment,
      [e.target.name]: e.target.value
    });
  };

  const handleAddPayment = () => {

    if (!newPayment.bookingId || !newPayment.customer || !newPayment.amount) {
      alert("Please fill all fields");
      return;
    }

    const payment = {
      id: payments.length + 1,
      ...newPayment
    };

    setPayments([...payments, payment]);

    setNewPayment({
      bookingId: "",
      customer: "",
      amount: "",
      status: "Pending"
    });

    setShowModal(false);
  };

  const handleDelete = (id) => {
    setPayments(payments.filter(p => p.id !== id));
  };

  return (
    <Layout>

      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h2>Payments</h2>

        <button style={addBtn} onClick={() => setShowModal(true)}>
          + Add Payment
        </button>
      </div>

      {/* Table */}

      <div style={card}>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>

          <thead>
            <tr
              style={{
                background: "#17b6c8",
                color: "white",
                textAlign: "left"
              }}
            >
              <th style={th}>Booking ID</th>
              <th style={th}>Customer</th>
              <th style={th}>Amount</th>
              <th style={th}>Status</th>
              <th style={th}>Action</th>
            </tr>
          </thead>

          <tbody>

            {payments.map((p) => (

              <tr
                key={p.id}
                style={{
                  borderBottom: "1px solid #eee"
                }}
              >

                <td style={td}>{p.bookingId}</td>
                <td style={td}>{p.customer}</td>
                <td style={td}>₹{p.amount}</td>
                <td style={td}>{p.status}</td>

                <td style={td}>
                  <button
                    style={deleteBtn}
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Modal */}

      {showModal && (

        <div style={modalOverlay}>

          <div style={modal}>

            <h3 style={{ color: "#17b6c8" }}>Add Payment</h3>

            <input
              type="number"
              name="bookingId"
              placeholder="Booking ID"
              value={newPayment.bookingId}
              onChange={handleChange}
              style={input}
            />

            <input
              type="text"
              name="customer"
              placeholder="Customer Name"
              value={newPayment.customer}
              onChange={handleChange}
              style={input}
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={newPayment.amount}
              onChange={handleChange}
              style={input}
            />

            <select
              name="status"
              value={newPayment.status}
              onChange={handleChange}
              style={input}
            >
              <option>Paid</option>
              <option>Pending</option>
            </select>

            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "12px"
              }}
            >

              <button style={addBtn} onClick={handleAddPayment}>
                Add
              </button>

              <button
                style={cancelBtn}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </Layout>
  );
}

/* Card */

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginTop: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
};

/* Table */

const th = {
  padding: "12px",
  fontSize: "14px"
};

const td = {
  padding: "12px",
  fontSize: "13px"
};

/* Buttons */

const addBtn = {
  background: "#17b6c8",
  color: "white",
  border: "none",
  padding: "4px 10px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px",
  height: "32px"
};

const cancelBtn = {
  background: "#888",
  color: "white",
  border: "none",
  padding: "4px 10px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px",
  height: "32px"
};

const deleteBtn = {
  background: "#ff6b6b",
  color: "white",
  border: "none",
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "12px",
  cursor: "pointer"
};

/* Inputs */

const input = {
  width: "100%",
  padding: "8px",
  marginTop: "10px",
  background: "white",
  border: "1px solid #17b6c8",
  borderRadius: "6px",
  outline: "none",
  fontSize: "13px"
};

/* Modal */

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modal = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "320px"
};

export default Payments;

