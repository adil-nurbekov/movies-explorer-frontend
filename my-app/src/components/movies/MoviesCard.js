import React from "react";
import "./MoviesCard.css";
import activeLike from "../../images/activeLike.svg";
import movie from "../../images/movie.jpg";

function MoviesCard() {
  return (
    <div className="card">
      <div className="card__info">
        <h3 className="card__info_header">33 слова о дизайне</h3>
        <span className="card__info_dur"> 1ч 42м</span>
        <img className="card__info_like" src={activeLike}></img>
      </div>
      <div className="card__img-wrapper">
        {" "}
        <div className="card__img-wrapper">
          <img className="card__img" src={movie}></img>
        </div>
      </div>
    </div>
  );
}
export default MoviesCard;
