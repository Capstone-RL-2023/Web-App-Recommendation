// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import TextField from "@mui/material/TextField";
import Movies from "./MovieBox";
//import { styled } from '@material-ui/core/styles';

function App() {
  


  const [data, setData] = useState({});
  const [toggle, setToggle] = useState(false);

  const showStats = (e) => {
    e.preventDefault();
    setToggle(!toggle);
  };

  const newRecommendation = (e) => {
    e.preventDefault();
    getRecommendations("/new_recommendation");
  };

  const toJson = (response) => response.json();

  const getRecommendations = async (url) => {
    fetch(url)
      .then(toJson)
      .then((data) => {
        var dict_rec = data.recommendations;
        const movie_array = [];
        var i = 0;

        for (var key in dict_rec) {
          movie_array[i] = dict_rec[key][0];
          i++;
        }
        var first_mov_ex = movie_array[0]?.substring(
          0,
          movie_array[0].length - 7
        );
        first_mov_ex = first_mov_ex?.replace(/\s/g, "+");
        console.log(movie_array);
        return fetch(
          "https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" +
            first_mov_ex
        )
          .then(toJson)
          .then((movies) => {
            console.log(data);
            console.log(movies);
            setData({ ...data, movies: movies.results });
          });
      });
  };

  const submitUserId = (e) => {
    if (e.keyCode === 13) {
      getRecommendations(`/recommend?user_id=${e.target.value}`);
    }
  };

  // Using useEffect for single rendering
  useEffect(() => {
    getRecommendations("/recommend");
  }, []);

  return (
    <div>
      <AppBar position="static" title="">
       <div className="navbar">
        <h3>Sequential Recommendation System</h3>
        </div>
        <TextField className="textfield"
          id="user-id"
          label="User ID"
          type="number"
          variant="filled"
          size="small"
          onKeyDown={submitUserId}
        />
      </AppBar>
      <br></br>
      <div className="App">
          <Movies
            key={
              Object.keys(data | {})?.length &&
              Object.keys(data?.recommendations)[0]
            }
            movie_array={data.movies}
        />
        <div className="buttons">
          <but-style>
          <Button    
            variant="contained"
            className="Button-stats"
            onClick={newRecommendation}
          >
            Next Recommendation
          </Button>
          </but-style>

          <but-style>
        <Button
          variant="contained"
          className="Button-stats"
          onClick={showStats}
        >
          View Stats
          </Button>
          </but-style>
          </div>

        
        <div style={{ display: toggle ? "block" : "none" }}>
          <p>
            <b>ndcg: </b>
            {data.ndcg}
          </p>
          <p>
            <b>precision: </b>
            {data.precision}
          </p>
          <p>
            <b>user_id: </b>
            {data.user_id}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
