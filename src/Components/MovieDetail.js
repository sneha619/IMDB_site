import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {

    const params = useParams();
    const [movieDetail, setMovieDetail] = useState({});

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${params.movieId}?api_key=eb5458fe403fc22355528d8264862b83`)
            .then((res)=> res.json())
            .then((data) => setMovieDetail(data));
    },[]);
    return(
        <>
            <h1>Movie Detail</h1>
            <hr />
            <h2>{movieDetail.title}</h2>
            <img src= {`https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`} />
            <h5>{movieDetail.overview}</h5>
        </>
    );
}

export default MovieDetail;