import { useEffect, useState } from "react";
import { getStaff, addStaff, deleteStaff } from "../services/staffService";

function Staff() {

  const [staff, setStaff] = useState([]);

  const [form, setForm] = useState({
    name: "",
    role: "",
    phone: ""
  });

  // Load staff
  useEffect(() => {

    const fetchStaff = async () => {
      try {

        const data = await getStaff();

        if (Array.isArray(data)) {
          setStaff(data);
        } else {
          console.log("API did not return array:", data);
          setStaff([]);
        }

      } catch (error) {
        console.log("Error fetching staff:", error);
      }
    };

    fetchStaff();

  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();

    try {

      await addStaff(form);

      setForm({
        name: "",
        role: "",
        phone: ""
      });

      const data = await getStaff();
      setStaff(data);

    } catch (error) {
      console.log("Error adding staff:", error);
    }
  };

  const handleDelete = async (id) => {

    try {

      await deleteStaff(id);

      const data = await getStaff();
      setStaff(data);

    } catch (error) {
      console.log("Error deleting staff:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Staff Management</h2>

      <form onSubmit={handleAddStaff} style={{ marginBottom: "20px" }}>

        <input
          type="text"
          name="name"
          placeholder="Staff Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <button type="submit">Add Staff</button>

      </form>

      <table border="1" width="100%" cellPadding="10">

        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {staff.length === 0 ? (
            <tr>
              <td colSpan="4" align="center">No staff found</td>
            </tr>
          ) : (
            staff.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.role}</td>
                <td>{s.phone}</td>

                <td>
                  <button onClick={() => handleDelete(s.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default Staff;