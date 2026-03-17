
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

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
      const text = await res.text();
      console.log("Login error:", text);
      alert("Invalid email or password");
      return;
    }

    const data = await res.json();

    localStorage.setItem("token", data.token);

    const role = data.role;

    if (role === "ROLE_ADMIN") {
      localStorage.setItem("role", "ADMIN");
      navigate("/dashboard");
    }
    else if (role === "ROLE_CUSTOMER") {
      localStorage.setItem("role", "CUSTOMER");
      navigate("/home");
    }
    else if (role === "ROLE_STAFF") {
      localStorage.setItem("role", "STAFF");
      navigate("/staff");
    }

  } catch (error) {
    console.log(error);
    alert("Login failed");
  }
};

  return (

    <div style={page}>

      <form
        onSubmit={handleLogin}
        style={card}
      >

        <h2 style={{textAlign:"center"}}>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button style={buttonStyle}>
          Login
        </button>

      </form>

    </div>

  );
}

/* styles */

const page = {
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  height:"100vh",
  background:"#17b6c8"
};

const card = {
  background:"white",
  padding:"30px",
  borderRadius:"10px",
  width:"300px",
  boxShadow:"0 0 10px rgba(0,0,0,0.1)"
};

const inputStyle = {
  width:"100%",
  padding:"8px",
  marginBottom:"10px",
  borderRadius:"5px",
  border:"1px solid #17b6c8",
  background:"white",
  color:"#17b6c8",
  outline:"none"
};

const buttonStyle = {
  width:"100%",
  background:"#17b6c8",
  color:"white",
  padding:"8px",
  border:"none",
  borderRadius:"5px",
  cursor:"pointer"
};

export default Login;

