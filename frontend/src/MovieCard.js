import React from "react";
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import "./MovieCard.css"


export default function MovieCard({ movie }) {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      >
      <CardContent>
        <CardMedia>
      <img
        className="card--image"
        src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} // endpoint to obtain image of movie poster
        alt={movie.title + " poster"}
          />
          </CardMedia>
        <h3 className="card--title">{movie.title}</h3>
        <p>
          <small>RELEASE DATE: {movie.release_date}</small>
        </p>
        <p>
          <small>RATING: {movie.vote_average}</small>
        </p>
        <p className="card--desc">{movie.overview}</p>
      </CardContent>
    </Grid>
  );
}
