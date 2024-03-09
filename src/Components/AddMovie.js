import { useRef, useState } from "react";

// const AddMovie = () => {
//     const [movieName, setMovieName] = useState('');
//     const [movieRating, setMovieRating] = useState(0);

//     const handleMovieNameChange = (e) => {
//         setMovieName(e.target.value);
//     }

//     const handleMovieRatingChange = (e) => {
//         setMovieRating(e.target.value);
//     }

//     const handleSubmit = () => {
//         console.log(movieName, movieRating);
//     }
//     return(
//         <div className="add-movie-form">
//             <h1>Add Movie</h1>
//             <div>
//                 <input placeholder="Add new movie name" onChange={handleMovieNameChange}/>
//             </div>
//             <div>
//                 <input type="number" placeholder="Enter Movie Rating" onChange={handleMovieRatingChange}/>
//             </div>
//             <button onClick={handleSubmit}>Add</button>
//         </div>
//     )
// }

const AddMovie = () => {
    const nameRef = useRef();
    const ratingRef = useRef();
    const validationRef = useRef();

    console.log("Rerendered")

    // const handleSubmit = () => {
    //     console.log(nameRef.current.value);
    //     console.log(ratingRef.current.value);

    //     if(nameRef.current.value.length < 3){
    //         nameRef.current.style.border = "1px solid red";
    //         validationRef.current.innerText = "Please enter min 3 char";
    //     }
    // }
    return(
        <div className="add-movie-form">
            <h1>Add Movie</h1>
            <div>
                <input placeholder="Add new movie name"/>
            </div>
            <div>
                <input type="number" placeholder="Enter Movie Rating"/>
            </div>
            <button>Add</button>
            {/* <div> ref = {validationRef} </div> */}
        </div>
    )
}

export default AddMovie;