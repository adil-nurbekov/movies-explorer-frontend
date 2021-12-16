import React, { useState } from "react";
import "./MoviesCard.css";
import activeLike from "../../images/activeLike.svg";
import movie from "../../images/movie.jpg";

function MoviesCard() {
  const [liked, setLiked] = useState(true);
  const handleLikeButton = () => {
    setLiked(!liked);
  };
  return (
    <div className="card">
      <div className="card__info">
        <h3 className="card__info_header">33 слова о дизайне</h3>
        <span className="card__info_dur"> 1ч 42м</span>
        <button
          className={liked ? "card__info_like" : "card__info_like_active"}
          onClick={handleLikeButton}
        ></button>
      </div>
      <div className="card__img-wrapper">
        {" "}
        <div className="card__img-wrapper">
          <img className="card__img" src={movie} alt="фото фильма"></img>
        </div>
      </div>
    </div>
  );
}
export default MoviesCard;
