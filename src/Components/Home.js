import { useEffect, useMemo, useState } from "react";
import MovieCard from "./MovieCard";
import Heading from "./Heading";
import Pagination from "./Pagination";
import ResultCard from "./ResultCard";

const Home = () => {

    const [movies,setMovies] = useState([]);
    const [watchList, updateWatchlist] = useState(() => {
        const favouritesData = JSON.parse(localStorage.getItem("favourites") || "[]");
        return (favouritesData);
    });
    const [query,setQuery] = useState("");
    const [results,setResults] = useState([]);

    const fetchMovies = (pageNo) =>{
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=9f48a5b363c49e0c31bf3d09bb319827&page=${pageNo}`)
        .then(res=> res.json())
        .then(data => setMovies(data.results || []))
        .catch(err => console.error("Failed to fetch movies:", err));
    }

    const  popularMovieCount = useMemo(() => movies.filter(movie => 
     movie.popularity > 1000
    ).length, [movies]);

    const onSearch = (e) => {
        e.preventDefault();

        setQuery(e.target.value);

        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=9f48a5b363c49e0c31bf3d09bb319827&page=${fetchMovies}&query=${e.target.value}`
        ).then(res => res.json())
        .then((data) => {
            if(!data.error){
                setResults(data.results);
            }else{
                setResults([]);
            }
        })
        .catch(err => console.error("Failed to fetch search results:", err));
    };

    useEffect(()=> {
        fetchMovies(1);
    }, []);

    return(
        <>
            <Heading />
            <p>Total Watchlist : {watchList.length}</p>
            <p>Popular movies (>1000) : {popularMovieCount}</p>
            <div className="input-search">
                <input type="text"
                    placeholder="Search for a movie"
                    value={query}
                    onChange={onSearch}
                />
            </div>
            { results.length > 0 && (
                <ul className="results">
                    {results.map(movie => (
                        <li key={movie.id}>
                            <ResultCard movie={movie}/>
                        </li>
                    ))}
                </ul>
            )}
            <div className = "home-page">
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

export default Home;