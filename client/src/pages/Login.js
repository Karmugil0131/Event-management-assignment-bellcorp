import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      login(data); // Save user + token
      navigate("/events");

    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="container" style={{ textAlign: "center", height: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h2 style={{fontSize: "42px"}}>Login,</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{display: "flex", flexDirection: "column"}}>
        <label style={{textAlign: "left", fontSize:"15px", marginBottom:"5px"}} htmlFor="email">Email Id:</label>
        <input
          id="email"
          type="email"
          style={{outline: "none"}}
          placeholder="Enter your email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>

        <br />

        <div style={{display: "flex", flexDirection: "column"}}>
          <label style={{textAlign: "left", fontSize:"15px", marginBottom:"5px"}} htmlFor="passwd">Password:</label>
          <input
            id="passwd"
            type="password"
            style={{outline: "none"}}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <br />

        <button style={{backgroundColor: "#000000", color: "#ffffff", padding: "10px 20px", border: "none", borderRadius: "8px"}} type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
