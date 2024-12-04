import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const params = useParams();
  const [movieDetail, setMovieDetail] = useState({});
  const [hoveredStar, setHoveredStar] = useState(0); // Tracks star being hovered over
  const [selectedRating, setSelectedRating] = useState(0); // User's selected rating
  const [message, setMessage] = useState(""); // Feedback message
  const [sessionId, setSessionId] = useState(null); // Store session ID

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${params.movieId}?api_key=eb5458fe403fc22355528d8264862b83`)
      .then((res) => res.json())
      .then((data) => setMovieDetail(data));
  }, [params.movieId]);

  // Get session ID on page load (you may store this in localStorage or any other mechanism if needed)
  useEffect(() => {
    // You can hardcode the session ID for testing, replace this with the actual session ID
    setSessionId("7cebbe672aacb1ab4fc5958c5e8016ac64e644ac"); // Replace with actual session ID

  }, []); // This will run once when the component is mounted

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleRatingSubmit = () => {
    if (!sessionId) {
      setMessage("Session ID is missing. Please log in.");
      return;
    }

    const url = `https://api.themoviedb.org/3/movie/${params.movieId}/rating?api_key=eb5458fe403fc22355528d8264862b83&session_id=${sessionId}`;

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ value: selectedRating * 2 }), // TMDB expects ratings out of 10
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setMessage("Rating submitted successfully!");
        } else {
          setMessage("Failed to submit rating.");
        }
      })
      .catch((err) => {
        console.error("Error submitting rating:", err);
        setMessage("An error occurred. Please try again.");
      });
  };

  return (
    <>
      <div className="movie-detail-page">
        <h1>Movie Detail</h1>
        <hr />
        <h2>{movieDetail.title}</h2>
        {movieDetail.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`}
            alt={`${movieDetail.title} Backdrop`}
          />
        )}
        <h4>{movieDetail.overview}</h4>
        <p><strong>Release Date:</strong> {movieDetail.release_date || "N/A"}</p>
        <p><strong>Duration:</strong> {movieDetail.runtime ? formatDuration(movieDetail.runtime) : "N/A"}</p>

        {/* Star Rating Section */}
        <div className="rating-section">
          <p>Rate this movie:</p>
          <div
            className="stars"
            onMouseLeave={() => setHoveredStar(0)} // Reset hover on mouse leave
          >
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <span
                  key={starValue}
                  className={`star ${hoveredStar >= starValue || selectedRating >= starValue ? "filled" : ""}`}
                  onMouseEnter={() => setHoveredStar(starValue)}
                  onClick={() => setSelectedRating(starValue)}
                >
                  ★
                </span>
              );
            })}
          </div>
          <button onClick={handleRatingSubmit} disabled={!selectedRating}>
            Submit Rating
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
