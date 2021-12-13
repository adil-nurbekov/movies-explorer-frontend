import React from "react";
import Header from "../Header";
import SearchForm from "./SearchForm";
import MoviesCard from "./MoviesCard";
import Footer from "../Footer";
import BurgerMenu from "./BurgerMenu";

import "./Movies.css";

function Movies() {
  return (
    <>
      {" "}
      <Header></Header>
      <SearchForm></SearchForm>
      <div className="movies">
        <BurgerMenu></BurgerMenu>

        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
        <MoviesCard></MoviesCard>
      </div>
      <Footer></Footer>
    </>
  );
}
export default Movies;
