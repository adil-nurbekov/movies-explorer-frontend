import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [movieText, setMovieText] = useState("");
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLogedIn] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [isActive, setIsActive] = useState(false);

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
  }, [isLoggedIn]);

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
  const findMovies = (input) => {
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
        localStorage.setItem("allMovies", JSON.stringify(movieArray));

        const array = movieArray.filter((m) =>
          JSON.stringify(m).toLowerCase().includes(input.toLowerCase())
        );
        if (array.length === 0) {
          setMovieText("Ничего не найдено");
          setTimeout(() => setMovieText(""), 2000);

          return setLoading(false);
        }
        setMovies(array);
        setMovieText("");
        setLoading(false);
        setIsActive(true);
      })
      .catch((err) => {
        setMovieText(
          "«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз»."
        );
      });
  };
  //

  // HANDLE SEARCH BUTTON FROM SAVED MOVIE PAGE
  const findSavedMovies = (input) => {
    console.log(input);
  };
  //

  const checked = () => {
    setCheckbox(!checkbox);
  };

  // useEffect(() => {
  //   location.pathname === "/saved-movies" && checkbox
  //     ? setSavedMovies(savedMovies.filter((m) => m.duration <= 40))
  //     : setSavedMovies(savedMovies);
  // }, [checkbox]);

  const loadMore = () => {
    setMovies(movies.slice(0, 14));
    console.log(movies);
  };

  return (
    <div>
      <SavedMoviesContext.Provider value={savedMovies}>
        <AllMovies.Provider value={movies}>
          <CurrentUser.Provider value={currentUser}>
            <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route
                path="/signup"
                element={
                  <Register onRegister={onRegister} statusText={statusText} />
                }
              ></Route>
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
                      checked={checked}
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
                      checked={checked}
                      checkbox={checkbox}
                      movieText={movieText}
                      isActive={isActive}
                      loadMore={loadMore}
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
