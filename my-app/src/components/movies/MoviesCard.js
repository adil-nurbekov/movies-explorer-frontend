import React from "react";
import "./MoviesCard.css";
import { SavedMoviesContext } from "../../context/SavedMoviesContext";
import { CurrentUser } from "../../context/CurrentUser";

function MoviesCard(props) {
  const user = React.useContext(CurrentUser);
  const isLiked = React.useContext(SavedMoviesContext).some(
    (i) => i.movieId === props.card.movieId && user.id === i.owner
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
        <a href={props.trailer} target="_blank" rel="noreferrer">
          <img className="card__img" src={props.image} alt="фото фильма"></img>
        </a>
      </div>
    </div>
  );
}
export default MoviesCard;
