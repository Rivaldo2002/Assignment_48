import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { logoutAPI } from "../services/api";

const Header = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAPI();
      logout();
      navigate("/login");
    } catch (err) {
      logout();
      navigate("/login");
    }
  };

  return (
    <nav className="header">
      <h1 onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
        diStreaming
      </h1>
      <div className="nav-links">
        {token ? (
          <>
            <Link to="/home">Home</Link>
            <Link to="/users">Users</Link>
            <Link to="/add-movie">Tambah Film</Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
