import React from "react";
import "./SavedMoviesCard.css";

function SavedMoviesCard(props) {
  const deleteCard = () => {
    props.deleteCard(props.card);
  };
  return (
    <>
      <div className="saved-card">
        <div className="saved-card__info">
          <h3 className="saved-card__info_header">{props.name}</h3>
          <span className="saved-card__info_dur">{props.duration}</span>
          <button
            className="saved-card__info-delete"
            onClick={deleteCard}
          ></button>
        </div>
        <div className="saved-card__img-wrapper">
          {" "}
          <img
            className="saved-card__img"
            src={props.image}
            alt="фото фильма"
          ></img>
        </div>
      </div>
    </>
  );
}
export default SavedMoviesCard;
