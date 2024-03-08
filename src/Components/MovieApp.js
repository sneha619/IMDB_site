import Heading from "./Heading";
import MovieList from "./MovieList";
import AddMovie from "./AddMovie";
import MovieDetail from "./MovieDetail";
import Header from "../Header";
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
            <Route path="/" element={<MovieList />} />
            <Route path="/movie-detail/:movieId" element={<MovieDetail />} />
            <Route path="/add-movie" element={<AddMovie />} />
          </Routes>
        </BrowserRouter>
    );
}
export default MovieApp;