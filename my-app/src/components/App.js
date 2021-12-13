import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Footer";
import Main from "./main/Main";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import PageNotFound from "./PageNotFound";
import SearchForm from "./movies/SearchForm";
import SavedMovies from "./saved-movies/SavedMovies";
import Profile from "./Profile";
import Movies from "./movies/Movies";
import BurgerMenu from "./movies/BurgerMenu";
import Preloader from "./Preloader";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/pre" element={<Preloader />}></Route>
        <Route path="/burger" element={<BurgerMenu />}></Route>
        <Route path="/" element={<Main />}></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/signin" element={<Login />}></Route>
        <Route path="saved-movies" element={<SavedMovies />}></Route>
        <Route path="/movies" element={<Movies></Movies>}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
