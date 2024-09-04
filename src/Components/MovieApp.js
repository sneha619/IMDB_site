import Heading from "./Heading";
import Home from "./Home";
import MovieDetail from "./MovieDetail";
import Header from "../Header";
import MovieFavourites from "./MovieFavourites";
import {
  BrowserRouter,
    createBrowserRouter,
    Route,
    RouterProvider,
    Routes,
  } from "react-router-dom";

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: (
  //       <>
  //           <Header />
  //           <MovieList />
  //       </>
  //     )
  //   },
  //   {
  //       path: "/movie-detail/:movieId",
  //       element: (
  //         <>
  //               <Header />
  //             <MovieDetail />
  //         </>
  //       )
  //     },
  //     {
  //       path: "/add-movie",
  //       element: (
  //         <>
  //               <Header />
  //               <AddMovie />
  //         </>
  //       )
  //     },
  // ]);

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