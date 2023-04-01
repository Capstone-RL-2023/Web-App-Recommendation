import { useState, useEffect } from "react";
import "../App.js";
import MovieCard from "./MovieCard.js";

const Home = ({ movie_array }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(movie_array);
  }, [movie_array]);

  return (
    <div className="container">
      {movies?.slice(0, 1).map((movie) => (
        <MovieCard movie={movie} />
      ))}
    </div>
  );
};

export default Home;
