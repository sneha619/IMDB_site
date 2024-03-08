import { Link } from "react-router-dom";

const Header = () => {
    return(
        <div className="header">
           <Link to= "/"><span>Movie List</span></Link>
           {/* <Link to= "/movie-detail"><span>Movie Detail</span></Link> */}
           <Link to= "/add-movie"><span>Add Movie</span></Link>
        </div>
    );
}

export default Header;