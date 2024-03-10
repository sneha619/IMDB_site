import { useEffect, useState } from "react"

const MovieFavourites = () => {
    const [favourites, setFavourites] = useState([]);

    useEffect (() => {
        const favouritesData = localStorage.getItem("favourites") || "[]";
        setFavourites(JSON.parse(favouritesData));
    },[]);

    return(
        <div>
            <h1>Favourites Movie</h1>
            <div className='favourite-wrapper'>
                <div className="left-section"></div>
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
                                favourites.map((favourite) => {
                                    <tr>
                                        <td><img src={`https://image.tmdb.org/t/p/w500${favourite.poster_path}`} /></td>
                                        <td>{favourite.title}</td>
                                        <td>{favourite.genre_ids[0]}</td>
                                        <td>{favourite.popularity}</td>
                                        <td>{favourite.vote_average}</td>
                                        <td><button>Delete</button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MovieFavourites;