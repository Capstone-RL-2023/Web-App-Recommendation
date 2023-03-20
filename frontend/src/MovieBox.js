import { useState, useEffect } from 'react';
import './App.js'
import MovieCard from './MovieCard.js';

const Home = ({movie_array}) => {
  const [movies, setMovies] = useState();
    
  const getMovies = async (url) => {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
  };
  
  useEffect(() => {
      const MovieUrl = "https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + movie_array;

      getMovies(MovieUrl);
  }, [movie_array]);

  return (
    <div className="container">
      <MovieCard movie={movies}/>
    </div>
  );
};

export default Home;