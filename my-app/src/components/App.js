import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Main from "./main/Main";
import Register from "./Register";
import Login from "./Login";
import PageNotFound from "./PageNotFound";
import SavedMovies from "./saved-movies/SavedMovies";
import Profile from "./Profile";
import Movies from "./movies/Movies";
import BurgerMenu from "./movies/BurgerMenu";
import { CurrentUser } from "../context/CurrentUser";
import { AllMovies } from "../context/AllMovies";
import { SavedMoviesContext } from "../context/SavedMoviesContext";
import * as MainApi from "../utils/MainApi";
import * as MovieApi from "../utils/MovieApi";

function App() {
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    MainApi.getUserInfo(token).then((res) => {
      setCurrentUser(res);
    });
  }, [currentUser]);

  useEffect(() => {
    MainApi.getSavedMovies(token).then((res) => {
      setSavedMovies(res);
    });
  }, [savedMovies]);

  useEffect(() => {
    if (token) {
      MainApi.checkToken(token).then(() => {
        setIsLogedIn(true);
        navigate("/movies");
      });
    }
  }, [token]);

  // BURGER MENU
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const closeBurger = () => {
    setIsBurgerOpen(false);
  };
  const handleBurgerMenu = () => {
    setIsBurgerOpen(true);
  };
  //

  // LOGIN
  const [isLoggedIn, setIsLogedIn] = useState(false);
  const onLogin = (email, password) => {
    MainApi.login(email, password)
      .then((res) => {
        if (res.token) {
          setIsLogedIn(true);
          navigate("/movies");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //

  // REGISTRATION
  const onRegister = (email, password, name) => {
    MainApi.registr(email, password, name)
      .then((res) => {
        if (res) {
          navigate("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //

  // CHENGE USERS INFO
  const onChange = (name, email) => {
    MainApi.changeUsersInfo(name, email, token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //

  // SAVE MOVIE
  const saveMovie = (card) => {
    MainApi.saveMovie(card, token)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };
  //

  // DELETE MOVIE FROM MOVIE PAGE
  const deleteMovie = (movie) => {
    const id = savedMovies.find((card) => card.movieId === movie.movieId);
    MainApi.deleteSavedMovie(token, id._id);
    console.log("deleted");
  };
  //

  // DELETE MOVIE FROM SAVED MOVIE PAGE
  const deleteCard = (card) => {
    MainApi.deleteSavedMovie(token, card._id);
    console.log(card._id + " deleted");
  };
  //

  // HANDLE SEARCH BUTTON
  const findMovies = (input) => {
    setLoading(true);
    MovieApi.getAllMovies().then((res) => {
      const movieArray = res.map((movie) => {
        return {
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: `https://api.nomoreparties.co${movie.image.url}`,
          trailer: movie.trailerLink,
          thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
          movieId: movie.id,
          nameEN: movie.nameEN,
          nameRU: movie.nameRU,
        };
      });
      const array = movieArray.filter(
        (m) =>
          m.nameRU.toLowerCase() === input.toLowerCase() ||
          m.year === input ||
          m.nameEN === input.toLowerCase()
      );
      setMovies(array);
      console.log(input);
      console.log(array);
      console.log(movieArray);
      setLoading(false);
    });
  };
  //

  // HANDLE SEARCH BUTTON FROM SAVED MOVIE PAGE
  const findSavedMovies = (input) => {
    console.log(input);
  };
  //

  return (
    <div>
      <SavedMoviesContext.Provider value={savedMovies}>
        <AllMovies.Provider value={movies}>
          <CurrentUser.Provider value={currentUser}>
            <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route
                path="/signup"
                element={<Register onRegister={onRegister} />}
              ></Route>
              <Route
                path="/signin"
                element={<Login onLogin={onLogin} />}
              ></Route>
              <Route
                path="saved-movies"
                element={
                  isLoggedIn ? (
                    <SavedMovies
                      handleBurgerMenu={handleBurgerMenu}
                      deleteCard={deleteCard}
                      handleSubmit={findSavedMovies}
                    />
                  ) : (
                    <Navigate to={"/"} />
                  )
                }
              ></Route>

              <Route
                path={"/movies"}
                element={
                  isLoggedIn ? (
                    <Movies
                      handleBurgerMenu={handleBurgerMenu}
                      saveMovie={saveMovie}
                      deleteMovie={deleteMovie}
                      findMovies={findMovies}
                      loading={loading}
                    />
                  ) : (
                    <Navigate to={"/"} />
                  )
                }
              ></Route>

              <Route
                path="/profile"
                element={
                  isLoggedIn ? (
                    <Profile
                      handleBurgerMenu={handleBurgerMenu}
                      change={onChange}
                    />
                  ) : (
                    <Navigate to={"/"} />
                  )
                }
              ></Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
            <BurgerMenu
              isOpen={isBurgerOpen}
              closeBurger={closeBurger}
            ></BurgerMenu>
          </CurrentUser.Provider>
        </AllMovies.Provider>
      </SavedMoviesContext.Provider>
    </div>
  );
}

export default App;
