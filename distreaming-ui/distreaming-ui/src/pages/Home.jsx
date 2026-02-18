import React, { useEffect, useState } from "react";
import { getMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getMovies();
        setMovies(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Memuat Koleksi Film...
      </p>
    );

  return (
    <div className="home-container">
      <h2 className="section-title">Semua Film</h2>
      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((m) => <MovieCard key={m.id} movie={m} />)
        ) : (
          <p>Belum ada koleksi film.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
