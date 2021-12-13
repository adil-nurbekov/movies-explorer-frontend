import React from "react";
import Header from "../Header";
import SearchForm from "../movies/SearchForm";
import SavedMoviesCard from "./SavedMoviesCard";
import Footer from "../Footer";

import "./SavedMovies.css";

function SavedMovies() {
  return (
    <>
      <Header></Header>
      <SearchForm></SearchForm>
      <div className="saved">
        <SavedMoviesCard></SavedMoviesCard>
        <Footer></Footer>
      </div>
    </>
  );
}
export default SavedMovies;
