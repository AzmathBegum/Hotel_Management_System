
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username:"",
    email:"",
    password:""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try{

      const res = await fetch("http://localhost:8080/api/auth/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.text();

      alert(data);

      navigate("/");

    }catch(error){
      console.log(error);
      alert("Registration failed");
    }

  };

  return (

    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh",
      background:"#17b6c8"
    }}>

      <form
        onSubmit={handleRegister}
        style={{
          background:"white",
          padding:"30px",
          borderRadius:"10px",
          width:"300px",
          boxShadow:"0 0 10px rgba(0,0,0,0.1)"
        }}
      >

        <h2 style={{textAlign:"center"}}>Register</h2>

        <input
          name="username"
          placeholder="Full Name"
          value={form.username}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <button style={buttonStyle}>
          Register
        </button>

      </form>

    </div>

  );
}

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
  borderRadius:"5px"
};

export default Register;

