import { useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import "./LoginStyle.css";
import Register from "./Register";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        alert("Invalid email or password");
        return;
      }

      const data = await res.json();

      localStorage.setItem("token", data.token);

      if (data.role === "ROLE_ADMIN") {
        navigate("/dashboard");
      } else if (data.role === "ROLE_CUSTOMER") {
        navigate("/home");
      } else if (data.role === "ROLE_STAFF") {
        navigate("/staff");
      }

    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">

      {/* LEFT IMAGE */}
      <div className="login-image">
        <img src="https://observer.com/wp-content/uploads/sites/2/2023/03/katikies-chromata-2022_5192.jpg?quality=80" alt="hotel" />
      </div>

      {/* RIGHT FORM */}
      <div className="login-form-container">
        <form className="form" onSubmit={handleLogin}>

          <h2>Welcome Back</h2>

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

          <span className="span">
            <a href="#">Forgot password?</a>
          </span>

          <button type="submit" className="submit">
            Log in
          </button>

          <span className="span">
            Don't have an account? <Link to="/register">Sign up</Link>
          </span>

        </form>
      </div>

    </div>
  );
};

export default Login;