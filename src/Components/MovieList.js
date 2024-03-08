import { useEffect, useMemo, useState } from "react";
import MovieCard from "./MovieCard";
import Heading from "./Heading";
import Pagination from "./Pagination";

const MovieList = () => {

    const [movies,setMovies] = useState([]);
    const [watchList, updateWatchlist] = useState([]);

    const fetchMovies = (pageNo) =>{
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=9f48a5b363c49e0c31bf3d09bb319827&page=${pageNo}`)
        .then(res=> res.json())
        .then(data => setMovies(data.results || []));
    }

    const  popularMovieCount = useMemo(() => movies.filter((movie) => {
        return movie.popularity > 1000;
    }).length [movies]);

    useEffect(()=> {
        fetchMovies(1);
    }, []);

    return(
        <>
            <Heading />
            <p>Total Watchlist : {watchList.length}</p>
            <p>Popular movies (>1000) : {popularMovieCount}</p>
            <div className = "movie-list">
                {!movies.length && <p>Loading please wait...</p>}
                {
                    movies?.map(movie =>(
                        <MovieCard movie={movie} onWatchlistUpdate = {updateWatchlist} watchlist={watchList}/>
                    ))
                    
                }
            </div>
            <Pagination onPagechange = {fetchMovies}/>
        </>
    );
}

export default MovieList;