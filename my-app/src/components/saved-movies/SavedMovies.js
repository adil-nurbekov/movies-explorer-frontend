import React, { useState } from "react";
import Header from "../Header";
import SearchForm from "../movies/SearchForm";
import SavedMoviesCard from "./SavedMoviesCard";
import Footer from "../Footer";
import BurgerMenu from "../movies/BurgerMenu";

import "./SavedMovies.css";

function SavedMovies() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const handleBurgerMenu = () => {
    setIsBurgerOpen(true);
  };
  const closeBurger = () => {
    setIsBurgerOpen(false);
  };
  return (
    <>
      <BurgerMenu isOpen={isBurgerOpen} closeBurger={closeBurger}></BurgerMenu>
      <Header isMain={false} burgerMenu={handleBurgerMenu} />
      <SearchForm></SearchForm>
      <div className="saved">
        <SavedMoviesCard></SavedMoviesCard>
        <SavedMoviesCard></SavedMoviesCard>
        <SavedMoviesCard></SavedMoviesCard>
      </div>
      <Footer></Footer>
    </>
  );
}
export default SavedMovies;
