import { Link } from "react-router-dom";

const MovieCard = ({ movie, onWatchlistUpdate, watchlist }) => {

    const isMovieAdded = watchlist.find(watchlistMovie => watchlistMovie.id == movie.id);
    const addToWatchlist = (e) => {
        onWatchlistUpdate((preWatchlist) => {
            const favourites = [...preWatchlist, movie];
            localStorage.setItem("favourites", JSON.stringify(favourites));
            return favourites;
        });
    }
    return(
        <div className="movie-card">
            <Link to={`/movie-detail/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} /></Link>
            <Link to={`/movie-detail/${movie.id}`}><h5>{movie.title}</h5></Link>
            <button data-id={movie.id} onClick={addToWatchlist}>
                { isMovieAdded ? "Remove from watchlist" : "Add to watchlist"}
            </button>
        </div>
    )
}
export default MovieCard;