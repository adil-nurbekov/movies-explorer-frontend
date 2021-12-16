import React from "react";
import Header from "../Header";
import SearchForm from "./SearchForm";
import MoviesCard from "./MoviesCard";
import Footer from "../Footer";
import BurgerMenu from "./BurgerMenu";

import "./Movies.css";

function Movies(props) {
  return (
    <>
      <BurgerMenu isOpen={true}></BurgerMenu>
      <Header isMain={false} />
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
