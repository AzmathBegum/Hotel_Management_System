import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginStyle.css"; 

const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.text();

      alert(data);

      navigate("/"); // back to login

    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="login-container">

      {/* LEFT IMAGE */}
      <div className="login-image">
        <img
          src="https://observer.com/wp-content/uploads/sites/2/2023/03/katikies-chromata-2022_5192.jpg?quality=80"
          alt="hotel"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="login-form-container">
        <form className="form" onSubmit={handleRegister}>

          <h2>Create Account</h2>

          <span className="input-span">
            <label className="label">Full Name</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </span>

          <span className="input-span">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </span>

          <span className="input-span">
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </span>

          <button type="submit" className="submit">
            Register
          </button>

          <span className="span">
            Already have an account? <Link to="/">Login</Link>
          </span>

        </form>
      </div>

    </div>
  );
};

export default Register;