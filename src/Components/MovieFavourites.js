import { useEffect, useState } from "react"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faArrowDown19 } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon


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
        const genresData = favouritesData.map((data) => data.genre_ids[0]);
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
            // eslint-disable-next-line eqeqeq
            return favourites.filter(movie => !selectedGenreId || movie.genre_ids[0] == selectedGenreId);
        })
    },[selectedGenreId,favourites]);

    const handleMovieSearch = (e) => {
        const text = e.target.value;
        setFilteredFavourites(() => {
            return favourites.filter(movie => movie.title.toLowerCase().includes(text.toLowerCase()));
        })
    }

    const handleAccendingSorting = () => {
        setFilteredFavourites(() => {
            return favourites.sort((a,b) =>{
                return a.popularity - b.popularity;
            });
        })
    }

    const handleDelete = (id) => {
        const updatedFavourites = favourites.filter(movie => movie.id !== id);
        setFavourites(updatedFavourites);
        setFilteredFavourites(updatedFavourites);
        localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    };

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
                            genres.map((genreID) =>(
                                <div className={`genre 
                                ${selectedGenreId === genreID ? "selected" : ""}`}
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
                    <input type="text" onChange={handleMovieSearch} placeholder="Search your favourite movie"></input>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Popularity <span 
                                onClick={handleAccendingSorting}>
                                  A  </span>
                                </th>
                                <th>Rating</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredFavourites.map((favourite) => (
                                    <tr key={favourite.id}>
                                        <td>
                                            <img 
                                            src={`https://image.tmdb.org/t/p/w500${favourite.poster_path}` } 
                                            alt={favourite.title}
                                            style= {{ width:"90px" }} 
                                        />
                                        </td>
                                        <td>{favourite.title}</td>
                                        <td>{genreids[favourite.genre_ids[0]]}</td>
                                        <td>{favourite.popularity}</td>
                                        <td>{favourite.vote_average}</td>
                                        <td>
                                        <button onClick={() => handleDelete(favourite.id)}>
                                            Delete
                                        </button>
                                        </td>
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