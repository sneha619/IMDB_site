import React from "react";
import { Link } from "react-router-dom"; // Importing Link for navigation

const MovieCard = ({ movie, onWatchlistUpdate, watchlist }) => {
    const handleWatchlistToggle = () => {
        const isInWatchlist = watchlist.some((item) => item.id === movie.id);

        let updatedWatchlist;
        if (isInWatchlist) {
            updatedWatchlist = watchlist.filter((item) => item.id !== movie.id);
        } else {
            updatedWatchlist = [...watchlist, movie];
        }

        onWatchlistUpdate(updatedWatchlist);
        localStorage.setItem("favourites", JSON.stringify(updatedWatchlist));
    };

    const isInWatchlist = watchlist.some((item) => item.id === movie.id);

    return (
        <div className="movie-card">
            <Link to={`/movie-detail/${movie.id}`}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-card-poster"
                />
            </Link>
            <div className="movie-card-info">
                <Link to={`/movie-detail/${movie.id}`} className="movie-title">
                    <h3>{movie.title}</h3>
                </Link>
                <p className="movie-rating">
                    <strong>Rating:</strong> {movie.vote_average}{" "}
                    <span className="star-icon">⭐</span>
                </p>
                <button
                    className={`movie-card-watchlist-btn ${
                        isInWatchlist ? "remove" : "add"
                    }`}
                    onClick={handleWatchlistToggle}
                >
                    {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
