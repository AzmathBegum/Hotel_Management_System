import { useState } from "react";
import Layout from "../components/Layout";

function Customers() {

  const [customers, setCustomers] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const API = "http://localhost:8080/api/customers";


  /* Load Customers */

  const loadCustomers = async () => {
  try {
    const res = await fetch(API);
    const data = await res.json();

    if (Array.isArray(data)) {
      setCustomers(data);
    } else {
      console.error("API did not return array:", data);
      setCustomers([]);
    }

  } catch (error) {
    console.log("Fetch error:", error);
  }
};


  /* Handle Input */

  const handleChange = (e) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value
    });
  };


  /* Add Customer */

  const handleAddCustomer = async () => {

    if (!newCustomer.name || !newCustomer.phone || !newCustomer.email) {
      alert("Please fill all fields");
      return;
    }

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCustomer)
    });

    setNewCustomer({
      name: "",
      phone: "",
      email: ""
    });

    setShowModal(false);

    loadCustomers();
  };


  /* Delete Customer */

  const handleDelete = async (id) => {

    await fetch(`${API}/${id}`, {
      method: "DELETE"
    });

    loadCustomers();
  };


  return (
    <Layout>

      {/* Header */}

      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
      }}>
        <h2>Customers</h2>

        <button style={addBtn} onClick={() => setShowModal(true)}>
          + Add Customer
        </button>
      </div>

      {/* Table */}

      <div style={card}>

        <table style={{width:"100%", borderCollapse:"collapse"}}>

          <thead>
            <tr style={{
              background:"#17b6c8",
              color:"white",
              textAlign:"left"
            }}>
              <th style={th}>Name</th>
              <th style={th}>Phone</th>
              <th style={th}>Email</th>
              <th style={th}>Action</th>
            </tr>
          </thead>

          <tbody>

            {customers.map(c => (

              <tr
                key={c.id}
                style={{
                  borderBottom:"1px solid #eee",
                  textAlign:"left"
                }}
              >

                <td style={td}>{c.name}</td>
                <td style={td}>{c.phone}</td>
                <td style={td}>{c.email}</td>

                <td style={td}>
                  <button
                    style={deleteBtn}
                    onClick={() => handleDelete(c.id)}
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

            <h3 style={{color:"#17b6c8"}}>Add Customer</h3>

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newCustomer.name}
              onChange={handleChange}
              style={input}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={newCustomer.phone}
              onChange={handleChange}
              style={input}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newCustomer.email}
              onChange={handleChange}
              style={input}
            />

            <div style={{
              display:"flex",
              gap:"8px",
              marginTop:"12px"
            }}>

              <button style={addBtn} onClick={handleAddCustomer}>
                Add
              </button>

              <button style={cancelBtn} onClick={() => setShowModal(false)}>
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
  background:"white",
  padding:"20px",
  borderRadius:"10px",
  marginTop:"20px",
  boxShadow:"0 2px 8px rgba(0,0,0,0.05)"
};

/* Table */

const th = {
  padding:"12px",
  fontSize:"14px"
};

const td = {
  padding:"12px",
  fontSize:"13px"
};

/* Buttons */

const addBtn = {
  background:"#17b6c8",
  color:"white",
  border:"none",
  padding:"4px 10px",
  borderRadius:"4px",
  cursor:"pointer",
  fontSize:"12px",
  height:"32px"
};

const cancelBtn = {
  background:"#888",
  color:"white",
  border:"none",
  padding:"4px 10px",
  borderRadius:"4px",
  cursor:"pointer",
  fontSize:"12px",
  height:"32px"
};

const deleteBtn = {
  background:"#ff6b6b",
  color:"white",
  border:"none",
  padding:"4px 8px",
  borderRadius:"4px",
  fontSize:"12px",
  cursor:"pointer"
};

/* Input */

const input = {
  width:"100%",
  padding:"8px",
  marginTop:"10px",
  background:"white",
  border:"1px solid #17b6c8",
  borderRadius:"6px",
  outline:"none",
  fontSize:"13px"
};

/* Modal */

const modalOverlay = {
  position:"fixed",
  top:0,
  left:0,
  width:"100%",
  height:"100%",
  background:"rgba(0,0,0,0.4)",
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
};

const modal = {
  background:"white",
  padding:"20px",
  borderRadius:"10px",
  width:"320px"
};

export default Customers;