import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      setMessage("Registration successful. Redirecting to login...");

      // Redirect after short delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="container" style={{ textAlign: "center", height: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h2 style={{fontSize: "42px"}}>Register to Explore Events</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{display: "flex", flexDirection: "column"}}>
          <label style={{textAlign: "left", fontSize:"15px", marginBottom:"5px"}} htmlFor="name">Name:</label>
          <input
          id="name"
          type="text"
          style={{outline: "none"}}
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        </div>

        <br />

        <div style={{display: "flex", flexDirection: "column"}}>
          <label style={{textAlign: "left", fontSize:"15px", marginBottom:"5px"}} htmlFor="emaill">Email Id:</label>
          <input
            id="emaill"
            type="email"
            style={{outline: "none"}}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div style={{display: "flex", flexDirection: "column"}}>
          <label style={{textAlign: "left", fontSize:"15px", marginBottom:"5px"}} htmlFor="passwrd">Password:</label>
          <input
            id="passwrd"
            type="password"
            style={{outline: "none"}}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
