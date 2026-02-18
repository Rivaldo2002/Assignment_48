import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserDetail } from "../services/api";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetchUserDetail(id);
        setUser(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [id]);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Memuat Detail Pengguna...
      </p>
    );
  if (!user)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Pengguna tidak ditemukan.
      </p>
    );

  return (
    <div className="auth-container">
      <div className="auth-form" style={{ textAlign: "left" }}>
        <h2 style={{ marginBottom: "20px" }}>Profil Pengguna</h2>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ color: "#aaa", fontSize: "14px" }}>
            Nama Lengkap
          </label>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>{user.name}</p>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ color: "#aaa", fontSize: "14px" }}>Email</label>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>{user.email}</p>
        </div>
        <div style={{ marginBottom: "25px" }}>
          <label style={{ color: "#aaa", fontSize: "14px" }}>ID Akun</label>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}># {user.id}</p>
        </div>
        <button onClick={() => navigate("/users")} className="cta-btn">
          Kembali ke Daftar
        </button>
      </div>
    </div>
  );
};

export default UserDetail;
