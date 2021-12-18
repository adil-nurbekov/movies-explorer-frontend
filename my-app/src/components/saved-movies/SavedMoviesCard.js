import React from "react";
import "./SavedMoviesCard.css";
import activeLike from "../../images/cross.svg";
import movie from "../../images/movie.jpg";

function SavedMoviesCard() {
  return (
    <>
      <div className="saved-card">
        <div className="saved-card__info">
          <h3 className="saved-card__info_header">33 слова о дизайне</h3>
          <span className="saved-card__info_dur"> 1ч 42м</span>
          <img
            className="saved-card__info_like"
            src={activeLike}
            alt="лого лайка"
          ></img>
        </div>
        <div className="saved-card__img-wrapper">
          {" "}
          <img className="saved-card__img" src={movie} alt="фото фильма"></img>
        </div>
      </div>
    </>
  );
}
export default SavedMoviesCard;
