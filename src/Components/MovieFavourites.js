import { useEffect } from "react"

const MovieFavourites = () => {

    useEffect (() => {
        const favouritesData = localStorage.getItem("favourites");
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
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MovieFavourites;