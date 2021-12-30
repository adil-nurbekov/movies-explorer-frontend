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
  const [movieText, setMovieText] = useState("");
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLogedIn] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    if (token) {
      MainApi.checkToken(token).then((res) => {
        MainApi.getUserInfo(token);
        setCurrentUser(res);
        setIsLogedIn(true);
        navigate("/movies");
        getSavedMovies();
      });
    }
  }, [token]);

  // BURGER MENU
  const closeBurger = () => {
    setIsBurgerOpen(false);
  };
  const handleBurgerMenu = () => {
    setIsBurgerOpen(true);
  };
  //

  // LOGIN
  const onLogin = (email, password) => {
    MainApi.login(email, password)
      .then((res) => {
        if (res.token) {
          MainApi.checkToken(res.token).then((res) => {
            setCurrentUser(res);
            setIsLogedIn(true);
            navigate("/movies");
          });
        }
      })
      .catch((err) => {
        if (err === 401) {
          setStatusText("Неправильный email или пароль");
        } else {
          setStatusText("Что-то пошло не так");
        }
        setTimeout(() => {
          setStatusText("");
        }, 2000);
        console.log(err);
      });
  };
  //

  // REGISTRATION
  const onRegister = (name, email, password) => {
    MainApi.registr(name, email, password)
      .then((res) => {
        if (res) {
          onLogin(email, password);
        }
      })
      .catch((err) => {
        if (err === 409) {
          setStatusText("Такой email уже зарегистрирован");
        } else {
          setStatusText("Что-то пошло не так");
        }
        setTimeout(() => {
          setStatusText("");
        }, 2000);
        console.log(err);
      });
  };
  //

  // CHANGE USERS INFO
  const onChange = (name, email) => {
    MainApi.changeUsersInfo(name, email, token)
      .then((res) => {
        setCurrentUser(res);
        setStatusText("Ваши данные были изменены");
        setTimeout(() => {
          setStatusText("");
        }, 2000);
      })
      .catch((err) => {
        if (err === 409) {
          setStatusText("Такой email уже зарегистрирован");
        } else {
          setStatusText("Что-то пошло не так");
        }
        setTimeout(() => {
          setStatusText("");
        }, 2000);
        console.log(err);
      });
  };
  //

  // GET SAVED MOVIES
  const getSavedMovies = () => {
    MainApi.getSavedMovies(token)
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // SAVE MOVIE
  const saveMovie = (card) => {
    MainApi.saveMovie(card, token)
      .then(() => {
        getSavedMovies();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //

  // DELETE MOVIE FROM MOVIE PAGE
  const deleteMovie = (movie) => {
    const id = savedMovies.find((card) => card.movieId === movie.movieId);
    MainApi.deleteSavedMovie(token, id._id)
      .then(() => {
        getSavedMovies();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //

  // DELETE MOVIE FROM SAVED MOVIE PAGE
  const deleteCard = (card) => {
    MainApi.deleteSavedMovie(token, card._id)
      .then(() => {
        getSavedMovies();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //

  // HANDLE SEARCH BUTTON
  const findMovies = (checked) => {
    setLoading(true);
    MovieApi.getAllMovies()
      .then((res) => {
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
        const input = localStorage.getItem("input");
        const array = movieArray.filter((m) =>
          JSON.stringify(m).toLowerCase().includes(input.toLowerCase())
        );
        localStorage.setItem("result", JSON.stringify(array));
        if (array.length === 0) {
          setMovieText("Ничего не найдено");
          setTimeout(() => setMovieText(""), 2000);

          return setLoading(false);
        }
        if (checked) {
          const sorted = array.filter((m) => m.duration <= 40);
          setMovieText(sorted.length > 0 ? "" : "Ничего не найдено");
          setLoading(false);
          setMovies(sorted);
          console.log(sorted);
          return;
        } else {
          setMovies(array);
          setMovieText("");
          setLoading(false);

          console.log(array);
        }
      })
      .catch((err) => {
        setMovieText(
          "«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз»."
        );
      });
  };
  //

  // HANDLE SEARCH BUTTON FROM SAVED MOVIE PAGE
  const findSavedMovies = (checked) => {
    setLoading(true);
    MainApi.getSavedMovies(token)
      .then((res) => {
        const input = localStorage.getItem("input");
        const savedArray = res.filter((m) =>
          JSON.stringify(m).toLowerCase().includes(input.toLowerCase())
        );
        localStorage.setItem("savedSearch", savedArray);
        if (savedArray.length === 0) {
          setMovieText("Ничего не найдено");
          setTimeout(() => setMovieText(""), 2000);

          return setLoading(false);
        }
        if (checked) {
          const sorted = savedArray.filter((m) => m.duration <= 40);
          setMovieText("");
          setLoading(false);
          setSavedMovies(sorted);
        }

        setMovieText("");
        setSavedMovies(savedArray);
        setLoading(false);
      })
      .catch((err) => {
        setMovieText(
          "«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз»."
        );
      });
  };
  //

  // SIGN OUT METHOD
  const signOut = () => {
    localStorage.clear();
    setIsLogedIn(false);
    console.log(isLoggedIn);
  };
  //

  return (
    <div>
      <SavedMoviesContext.Provider value={savedMovies}>
        <AllMovies.Provider value={movies}>
          <CurrentUser.Provider value={currentUser}>
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    isLogedIn={isLoggedIn}
                    handleBurgerMenu={handleBurgerMenu}
                  />
                }
              ></Route>
              <Route
                path="/signup"
                element={
                  <Register onRegister={onRegister} statusText={statusText} />
                }
              ></Route>
              <Route path="/ds" element={<PageNotFound />}></Route>
              <Route
                path="/signin"
                element={<Login onLogin={onLogin} statusText={statusText} />}
              ></Route>
              <Route
                path="saved-movies"
                element={
                  isLoggedIn ? (
                    <SavedMovies
                      handleBurgerMenu={handleBurgerMenu}
                      deleteCard={deleteCard}
                      handleSubmit={findSavedMovies}
                      isLogedIn={isLoggedIn}
                      movieText={movieText}
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
                      movieText={movieText}
                      isLogedIn={isLoggedIn}
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
                      statusText={statusText}
                      isLogedIn={isLoggedIn}
                      onSignOut={signOut}
                    />
                  ) : (
                    <Navigate to={"/"} />
                  )
                }
              ></Route>
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
