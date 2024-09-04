import { Link } from "react-router-dom";

const Header = () => {
    return(
        <div className="header">
           <Link to= "/"><span>Home</span></Link>
           <Link to= "favourites"><span>Favourites</span></Link>
        </div>
    );
}

export default Header;