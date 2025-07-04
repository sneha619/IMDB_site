import Home from "./Home";
import MovieDetail from "./MovieDetail";
import Header from "../Header";
import MovieFavourites from "./MovieFavourites";
import {
  BrowserRouter,
    Route,
    Routes,
  } from "react-router-dom";

const MovieApp = () => {
    return(
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie-detail/:movieId" element={<MovieDetail />} />
            <Route path="/favourites" element={<MovieFavourites />} />
          </Routes>
        </BrowserRouter>
    );
}
export default MovieApp;