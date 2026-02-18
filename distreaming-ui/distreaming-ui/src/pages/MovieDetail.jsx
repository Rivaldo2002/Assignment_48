import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetail } from "../services/api";
const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Untuk tombol back
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getMovieDetail(id);
        setMovie(res.data.data);
      } catch (err) {
        console.error("Gagal ambil detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    );
  if (!movie)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Film tidak ditemukan.
      </div>
    );

  // Logic Warna Rating
  const getRatingColor = (rating) => {
    if (rating >= 8) return "#46d369";
    if (rating >= 6) return "#e5a109";
    return "#e50914";
  };

  return (
    // SECTION HERO: Background Image dari API
    <div
      className="detail-hero"
      style={{ backgroundImage: `url(${movie.thumbnail})` }}
    >
      {/* Overlay Gelap */}
      <div className="hero-overlay"></div>

      {/* Konten Utama */}
      <div className="detail-container">
        <div className="detail-content">
          {/* Bagian Kiri: Poster */}
          <img
            src={movie.thumbnail}
            alt={movie.title}
            className="detail-poster"
          />

          {/* Bagian Kanan: Info */}
          <div className="detail-info">
            <h1 className="detail-title">{movie.title}</h1>

            <div className="detail-meta">
              <span className="meta-item">{movie.release_year}</span>

              {/* Badge Rating */}
              <div
                className="rating-box"
                style={{
                  color: getRatingColor(movie.rating),
                  borderColor: getRatingColor(movie.rating),
                }}
              >
                ★ {movie.rating} / 10
              </div>

              {movie.category && (
                <span className="meta-item" style={{ color: "#aaa" }}>
                  • {movie.category.name}
                </span>
              )}
            </div>

            <p className="detail-description">{movie.description}</p>

            <div className="action-buttons">
              <button className="btn-primary">▶ Tonton Sekarang</button>
              <button className="btn-secondary" onClick={() => navigate(-1)}>
                ← Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
