import React from "react";
import Header from "../Header";
import SearchForm from "../movies/SearchForm";
import SavedMoviesCard from "./SavedMoviesCard";
import Footer from "../Footer";
import { SavedMoviesContext } from "../../context/SavedMoviesContext";
import "./SavedMovies.css";

function SavedMovies(props) {
  const saved = React.useContext(SavedMoviesContext);

  const duration = (num) => {
    const hours = Math.floor(num / 60);
    const minutes = Math.floor(num - hours * 60);
    return `${
      hours > 0 ? hours + " ч : " + minutes + " мин" : minutes + " мин"
    }`;
  };
  const deleteCard = (card) => {
    props.deleteCard(card);
  };
  const onSubmit = (input) => {
    props.handleSubmit(input);
  };
  return (
    <>
      <Header isLogedIn={props.isLogedIn} burgerMenu={props.handleBurgerMenu} />
      <SearchForm onSubmit={onSubmit}></SearchForm>
      <div className="saved">
        <div className="saved__empty">{props.movieText}</div>{" "}
        {saved.map((card) => {
          return (
            <SavedMoviesCard
              card={card}
              image={card.image}
              name={card.nameRU}
              key={card._id}
              duration={duration(card.duration)}
              deleteCard={deleteCard}
              trailer={card.trailer}
            ></SavedMoviesCard>
          );
        })}
      </div>
      <Footer></Footer>
    </>
  );
}
export default SavedMovies;
