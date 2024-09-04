import { useEffect, useState } from "react"

let genreids = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
    };

const MovieFavourites = () => {
    const [favourites, setFavourites] = useState([]);
    const [filteredFavourites, setFilteredFavourites] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenreId, setSelectedGenreId] = useState("");

    useEffect (() => {
        const favouritesData = JSON.parse(localStorage.getItem("favourites") || "[]");
        const genresData = favouritesData.map(data => data.genre_ids[0]);
        setGenres(Array.from(new Set(genresData)));
        setFavourites(favouritesData);
        setFilteredFavourites(favouritesData);
    },[]);

    const handleGenreSelection = (e) => {
        const id = e.target.dataset.id;
        setSelectedGenreId(id);
    }

    useEffect(() => {
        setFilteredFavourites(() => {
            return favourites.filter(movie => movie.genre_ids[0] == setSelectedGenreId);
        })
    },[setSelectedGenreId,favourites]);

    return(
        <div>
            <h1 className="Favourite_movie_heading">Favourites Movie</h1>
            <div className='favourite-wrapper'>
                <div className="left-section">
                    <div className="genre-wrapper">
                        <div className={`genre ${selectedGenreId === "" ? "selected" : ""}`}
                            onClick={handleGenreSelection}
                            data-id=""
                        >
                            All Genre</div>
                        {
                            genres.map(genreID =>(
                                <div className={`genre 
                                ${selectedGenreId == genreID ? "selected" : ""}`}
                                    onClick={handleGenreSelection}
                                    data-id={genreID}
                                >
                                    {genreids[genreID]}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="right-section">
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Popularity</th>
                                <th>Rating</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredFavourites.map((favourite) => (
                                    <tr>
                                        <td><img src={`https://image.tmdb.org/t/p/w500${favourite.poster_path}` } width={"90px"} /></td>
                                        <td>{favourite.title}</td>
                                        <td>{genreids[favourite.genre_ids[0]]}</td>
                                        <td>{favourite.popularity}</td>
                                        <td>{favourite.vote_average}</td>
                                        <td><button>Delete</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MovieFavourites;