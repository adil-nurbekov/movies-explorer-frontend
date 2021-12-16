import React, { useState } from "react";
import Header from "../Header";
import SearchForm from "./SearchForm";
import MoviesCard from "./MoviesCard";
import Footer from "../Footer";
import BurgerMenu from "./BurgerMenu";

import "./Movies.css";

function Movies() {
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
      <div className="movies">
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <button className="movies__else">Еще</button>
      </div>
      <Footer></Footer>
    </>
  );
}
export default Movies;
