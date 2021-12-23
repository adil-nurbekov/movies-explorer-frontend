import React from "react";
import "./MoviesCard.css";
import { SavedMoviesContext } from "../../context/SavedMoviesContext";

function MoviesCard(props) {
  const isLiked = React.useContext(SavedMoviesContext).some(
    (i) => i.movieId === props.card.movieId
  );

  const handleLikeButton = () => {
    if (isLiked) {
      return props.deleteMovie(props.card);
    }
    props.saveMovie(props.card);
  };

  return (
    <div className="card">
      <div className="card__info">
        <h3 className="card__info_header">{props.name}</h3>
        <span className="card__info_dur">{props.duration}</span>
        <button
          className={isLiked ? "card__info_like_active" : "card__info_like"}
          onClick={handleLikeButton}
        ></button>
      </div>
      <div className="card__img-wrapper">
        <img className="card__img" src={props.image} alt="фото фильма"></img>
      </div>
    </div>
  );
}
export default MoviesCard;
