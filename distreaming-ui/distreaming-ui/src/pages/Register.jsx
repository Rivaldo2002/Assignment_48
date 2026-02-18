import React, { useState } from "react";
import { registerAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Mengirim data sesuai validator di AuthController.php
      await registerAPI({ name, email, password });
      alert("Registrasi Berhasil! Silakan Login.");
      navigate("/login");
    } catch (err) {
      // Menangkap pesan error dari Laravel (seperti email sudah ada)
      setError(err.response?.data?.email?.[0] || "Gagal Mendaftar");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Daftar Akun Baru</h2>
        {error && <p className="error-box">{error}</p>}
        <input
          type="text"
          placeholder="Nama Lengkap"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (Min 8 Karakter)"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="cta-btn">
          Daftar
        </button>
        <p
          onClick={() => navigate("/login")}
          style={{ cursor: "pointer", marginTop: "10px" }}
        >
          Sudah punya akun? Login
        </p>
      </form>
    </div>
  );
};

export default Register;
