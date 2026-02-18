import React, { useState, useContext } from "react";
import { loginAPI } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginAPI({ email, password });
      login(res.data.data.user, res.data.data.token);
      alert("Login Berhasil!");
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Kombinasi salah");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login diStreaming</h2>
        {error && <p className="error-box">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="cta-btn">
          Masuk
        </button>
        <p
          onClick={() => navigate("/register")}
          style={{ cursor: "pointer", marginTop: "10px" }}
        >
          Daftar Akun Baru
        </p>
      </form>
    </div>
  );
};

export default Login;
