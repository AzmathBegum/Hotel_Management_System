import { useState, useEffect } from "react";
import Layout from "../components/Layout";

function Rooms() {

  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [newRoom, setNewRoom] = useState({
    number: "",
    type: "",
    price: "",
    status: "Available"
  });

  const API = "http://localhost:8080/api/rooms";

  // JWT Header
  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  });

  // Load rooms
  const loadRooms = async () => {
  try {

    const token = localStorage.getItem("token");

    const res = await fetch(API, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      console.log("Request failed:", res.status);
      return;
    }

    const data = await res.json();

    if (Array.isArray(data)) {
      setRooms(data);
    } else {
      console.log("Unexpected response:", data);
      setRooms([]);
    }

  } catch (error) {
    console.log("Error loading rooms:", error);
  }
};

  useEffect(() => {

  const fetchRooms = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/api/rooms", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        console.log("Request failed:", res.status);
        return;
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setRooms(data);
      } else {
        setRooms([]);
      }

    } catch (error) {
      console.log("Error fetching rooms:", error);
    }
  };

  fetchRooms();

}, []);

  const statusStyle = (status) => ({
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
    color: status === "Available" ? "#2bb673" : "#ff6b6b",
    backgroundColor: status === "Available" ? "#e8f8f1" : "#ffecec"
  });

  const handleChange = (e) => {
    setNewRoom({
      ...newRoom,
      [e.target.name]: e.target.value
    });
  };

  const handleAddRoom = async () => {

    try {

      await fetch(API, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newRoom)
      });

      setNewRoom({
        number: "",
        type: "",
        price: "",
        status: "Available"
      });

      setShowModal(false);

      loadRooms();

    } catch (error) {
      console.log("Error adding room:", error);
    }
  };

  const handleDeleteRoom = async (id) => {

    try {

      await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });

      loadRooms();

    } catch (error) {
      console.log("Error deleting room:", error);
    }
  };

  const filteredRooms = rooms.filter((room) => {

    const matchesSearch =
      room.number?.toString().includes(search) ||
      room.type?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || room.status === filter;

    return matchesSearch && matchesFilter;

  });

  return (
    <Layout>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Rooms</h2>

        <button
          onClick={() => setShowModal(true)}
          style={addBtn}
        >
          + Add Room
        </button>
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Search room..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInput}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <button style={filterBtn} onClick={() => setFilter("All")}>All</button>
        <button style={filterBtn} onClick={() => setFilter("Available")}>Available</button>
        <button style={filterBtn} onClick={() => setFilter("Booked")}>Booked</button>
      </div>

      <div style={card}>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>

          <thead>
            <tr style={{ background: "#17b6c8", color: "white" }}>
              <th style={th}>Room No</th>
              <th style={th}>Type</th>
              <th style={th}>Price</th>
              <th style={th}>Status</th>
              <th style={th}>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredRooms.length === 0 ? (
              <tr>
                <td colSpan="5" align="center">No rooms found</td>
              </tr>
            ) : (

              filteredRooms.map((room) => (
                <tr key={room.id} style={row}>

                  <td style={td}>{room.number}</td>
                  <td style={td}>{room.type}</td>
                  <td style={td}>₹{room.price}</td>

                  <td style={td}>
                    <span style={statusStyle(room.status)}>
                      {room.status}
                    </span>
                  </td>

                  <td style={td}>
                    <button
                      style={deleteBtn}
                      onClick={() => handleDeleteRoom(room.id)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))

            )}

          </tbody>

        </table>

      </div>

      {showModal && (

        <div style={modalOverlay}>

          <div style={modal}>

            <h3>Add Room</h3>

            <input
              name="number"
              placeholder="Room Number"
              value={newRoom.number}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="type"
              placeholder="Room Type"
              value={newRoom.type}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="price"
              placeholder="Price"
              value={newRoom.price}
              onChange={handleChange}
              style={inputStyle}
            />

            <select
              name="status"
              value={newRoom.status}
              onChange={handleChange}
              style={inputStyle}
            >
              <option>Available</option>
              <option>Booked</option>
            </select>

            <div style={{ marginTop: "10px" }}>

              <button style={addBtn} onClick={handleAddRoom}>
                Save
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

/* Styles */

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginTop: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
};

const th = { padding: "10px" };
const td = { padding: "10px" };

const row = {
  textAlign: "center",
  borderBottom: "1px solid #ddd"
};

const addBtn = {
  background: "#17b6c8",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "5px",
  cursor: "pointer"
};

const cancelBtn = {
  background: "#ccc",
  border: "none",
  padding: "6px 12px",
  borderRadius: "5px",
  marginLeft: "10px",
  cursor: "pointer"
};

const deleteBtn = {
  background: "#ff6b6b",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: "4px",
  cursor: "pointer"
};

const filterBtn = {
  marginRight: "6px",
  padding: "6px 12px",
  borderRadius: "5px",
  border: "1px solid #17b6c8",
  background: "#17b6c8",
  color: "white",
  cursor: "pointer"
};

const searchInput = {
  padding: "8px",
  width: "220px",
  borderRadius: "5px",
  border: "1px solid #17b6c8",
  background: "white",
  outline: "none"
};

const inputStyle = {
  width: "100%",
  marginBottom: "10px",
  padding: "7px",
  borderRadius: "5px",
  border: "1px solid #17b6c8",
  background: "white",
  outline: "none"
};

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
  padding: "25px",
  borderRadius: "10px",
  width: "300px"
};

export default Rooms;