import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/api"; // Pastikan path ini benar
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetchUsers();
        // Pastikan backend mengirim format { data: [...] } atau sesuaikan
        setUsers(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <p>Memuat Data Pengguna...</p>
      </div>
    );

  return (
    // Gunakan class 'user-list-container' agar paddingnya pas sesuai CSS baru
    <div className="user-list-container">
      <h2 className="section-title">Daftar Pengguna</h2>

      <div style={{ overflowX: "auto" }}>
        {/* Hapus semua style={{...}} di table, tr, th, td */}
        {/* Biarkan index.css yang mengaturnya agar rapi & seragam */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="logout-btn" // Kita pinjam class tombol merah yg sudah ada
                      style={{ fontSize: "12px", padding: "5px 10px" }} // Sedikit penyesuaian ukuran
                      onClick={() => navigate(`/users/${user.id}`)}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  Tidak ada data pengguna.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
