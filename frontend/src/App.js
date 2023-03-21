// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Movies from "./MovieBox";

function App() {
  const [data, setData] = useState([{}]);
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  const getRecommendations = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setData(data);
  };

  // Using useEffect for single rendering
  useEffect(() => {
    getRecommendations("/recommend");
  }, []);

  var dict_rec = data.recommendations;
  const movie_array = [];
  var i = 0;

  for (var key in dict_rec) {
    movie_array[i] = dict_rec[key][0];
    i++;
  }

  return (
    <div>
      <AppBar position="static" title="">
        <h3>Recommendation System</h3>
      </AppBar>
      <div className="App">
        {movie_array && (
          <div>
            <Movies movie_array={movie_array} />
          </div>
        )}

        <Button
          variant="contained"
          className="Button-stats"
          onClick={handleClick}
        >
          View Stats
        </Button>

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
