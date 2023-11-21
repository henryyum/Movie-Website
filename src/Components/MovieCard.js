import React from "react";
import {Link} from 'react-router-dom'

export default function MovieCard(props) {
  return (
    <div className="MovieCard">
      <Link to={props.id}>
      <img
        className="MovieCard-image"
        src={props.image? `https://image.tmdb.org/t/p/w500${props.image}` : "./images/no-poster.png"}
        alt=""
      
      />
      </Link>
      <div className="MovieCard-text">
        <h3>{props.movieTitle}</h3>
        <p className="MovieCard-rating"><img className="star-icon" src="./images/star.png" alt="star-icon"/>{props.rating.toFixed(1)} / 10 </p>
        <p>{props.movieRelease}</p>
      </div>
    </div>
  );
}
