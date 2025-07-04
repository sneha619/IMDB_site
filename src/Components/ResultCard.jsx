import React from "react";
import { Link } from "react-router-dom";

const ResultCard = ({movie}) => {
    // Debug: Log movie data to console
    console.log('ResultCard movie data:', movie);
    
    return(
        <div className="result-card">
            <Link to={`/movie-detail/${movie.id}`} className="poster-wrapper">
                {movie.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt = {`${movie.title} Poster`}
                    />
                ): (
                    <div className="filler-poster"></div>
                )}
            </Link>

            <div className="info">
                <div className="header">
                    <h3 className="title">{movie.title || "No Title"}</h3>
                    <h4 className="release-date">{movie.release_date || "No Release Date"}</h4>
                    <span>{movie.duration || movie.runtime ? `${movie.runtime} min` : "Duration N/A"}</span>
                </div>
            </div>
        </div>
    )
}

export default ResultCard;