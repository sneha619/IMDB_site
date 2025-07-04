import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Heading from "./Heading";
import Pagination from "./Pagination";
import ResultCard from "./ResultCard";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [watchList, updateWatchlist] = useState(() => {
        const favouritesData = JSON.parse(localStorage.getItem("favourites") || "[]");
        return favouritesData;
    });
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const fetchMovies = (pageNo) => {
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=9f48a5b363c49e0c31bf3d09bb319827&page=${pageNo}`)
            .then((res) => res.json())
            .then((data) => setMovies(data.results || []))
            .catch((err) => console.error("Failed to fetch movies:", err));
    };

    const fetchTopRatedMovies = () => {
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=9f48a5b363c49e0c31bf3d09bb319827`)
            .then((res) => res.json())
            .then((data) => setTopRatedMovies(data.results || []))
            .catch((err) => console.error("Failed to fetch top-rated movies:", err));
    };

    // const popularMovieCount = useMemo(() => movies.filter((movie) => movie.popularity > 1000).length, [movies]);

    const onSearch = (e) => {
        const searchQuery = e.target.value;
        setQuery(searchQuery);

        if (searchQuery.length === 0) {
            setResults([]);
            return;
        }

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=9f48a5b363c49e0c31bf3d09bb319827&query=${searchQuery}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data.errors) {
                    setResults(data.results || []);
                } else {
                    setResults([]);
                }
            })
            .catch((err) => console.error("Failed to fetch search results:", err));
    };

    useEffect(() => {
        fetchMovies(1);
        fetchTopRatedMovies(); // Fetch top-rated movies
        // fetchTrendingMovies(); // Fetch trending movies of the week
    }, []);

    return (
        <>
            <Heading />
            <div className="input-search">
                <input
                    type="text"
                    placeholder="Search for a movie"
                    value={query}
                    onChange={onSearch}
                />
            </div>
            {results.length > 0 && (
                <ul className="results">
                    {results.map((movie) => (
                        <li key={movie.id}>
                            <ResultCard movie={movie} />
                        </li>
                    ))}
                </ul>
            )}

            {/* Top Rated Movies Section */}
            <section className="top-rated-section">
                <div className="top-rated-header">
                    <h2 className="section-title">Top Rated Movies</h2>
                </div>
                <div className="top-rated-slider-container">
                    <div className="top-rated-slider">
                        {topRatedMovies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onWatchlistUpdate={updateWatchlist}
                                watchlist={watchList}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Movies Section */}
            <div className="home-page">
                {!movies.length && <p>Loading please wait...</p>}
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onWatchlistUpdate={updateWatchlist}
                        watchlist={watchList}
                    />
                ))}
            </div>
            <Pagination onPagechange={fetchMovies} />
        </>
    );
};

export default Home;
