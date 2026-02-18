import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const addDefaultSrc = (ev) => {
    ev.target.src = "https://via.placeholder.com/300x450?text=No+Image";
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return "#46d369";
    if (rating >= 6) return "#e5a109";
    return "#e50914";
  };

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <div className="movie-card">
        <div className="image-container">
          <img
            src={movie.thumbnail}
            alt={movie.title}
            className="movie-thumbnail"
            onError={addDefaultSrc}
          />
          <span
            className="card-rating-badge"
            style={{ backgroundColor: getRatingColor(movie.rating) }}
          >
            {movie.rating}
          </span>
        </div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <div className="info-footer">
            <p className="year">{movie.release_year}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
