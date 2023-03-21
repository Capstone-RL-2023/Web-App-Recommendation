// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Movies from "./MovieBox";

function App() {
  const [stats, setStats] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [toggle, setToggle] = useState(false);

  const showStats = (e) => {
    e.preventDefault();
    setToggle(!toggle);
  };

  const newRecommendation = (e) => {
    e.preventDefault();
    getRecommendations("/new_recommendation");
  };

  const getRecommendations = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setStats({
      ndcg: data.ndcg,
      precision: data.precision,
      user_id: data.user_id,
    });
    setRecommendations(data.recommendations);
  };

  // Using useEffect for single rendering
  useEffect(() => {
    getRecommendations("/recommend");
  }, []);

  var dict_rec = recommendations;
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
        <div>
          <Movies key={recommendations} movie_array={movie_array} />
          <Button
            variant="contained"
            className="Button-stats"
            onClick={newRecommendation}
          >
            Next Recommendation
          </Button>
        </div>

        <Button
          variant="contained"
          className="Button-stats"
          onClick={showStats}
        >
          View Stats
        </Button>

        <div style={{ display: toggle ? "block" : "none" }}>
          <p>
            <b>ndcg: </b>
            {stats.ndcg}
          </p>
          <p>
            <b>precision: </b>
            {stats.precision}
          </p>
          <p>
            <b>user_id: </b>
            {stats.user_id}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
