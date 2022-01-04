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
import { SavedMoviesContext } from "../context/SavedMoviesContext";
import { AllMovies } from "../context/AllMovies";
import * as MainApi from "../utils/MainApi";
import * as MovieApi from "../utils/MovieApi";
import PagePreloader from "./PagePreloader";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [movieText, setMovieText] = useState("");
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLogedIn] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   setAuthorize(false);
  //   // checkToken();
  //   setAuthorize(true);
  //   if (isLoggedIn) {
  //     Promise.all([MovieApi.getAllMovies(), MainApi.getUserInfo()])
  //       .then((res) => {
  //         const [moviesArray, userInfo] = res;
  //         setCurrentUser(userInfo);
  //         // getSavedMovies();
  //         if (localStorage.getItem("movies") === null) {
  //           localStorage.setItem("movies", JSON.stringify([]));
  //           console.log("nofilm");
  //         }
  //         setMovies(JSON.parse(localStorage.getItem("movies")));
  //       })
  //       .catch((err) => console.log(err));
  //   }
  //   console.log("need auth");
  // }, [isLoggedIn, authorize]);

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
    MainApi.changeUsersInfo(name, email)
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
    MainApi.getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // SAVE MOVIE
  const saveMovie = (card) => {
    MainApi.saveMovie(card)
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
    const id = savedMovies.find((card) => card.movieId === movie.id);
    MainApi.deleteSavedMovie(id._id)
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
    MainApi.deleteSavedMovie(card._id)
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
        const array = res.filter((m) =>
          JSON.stringify(m).toLowerCase().includes(input.toLowerCase())
        );

        setMovies(array);
        localStorage.setItem("movies", JSON.stringify(array));
        localStorage.setItem("input", input);
        setLoading(false);
        array.length === 0
          ? setMovieText("Ничего не найдено")
          : setMovieText("");
      })
      .catch((err) => {
        setMovieText(
          "«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз»."
        );
      });
  };

  // HANDLE SEARCH BUTTON FROM SAVED MOVIE PAGE
  const findSavedMovies = (inputSaved) => {
    setLoading(true);
    MainApi.getSavedMovies()
      .then((res) => {
        const savedArray = res.filter((m) =>
          JSON.stringify(m).toLowerCase().includes(inputSaved.toLowerCase())
        );

        setSavedMovies(savedArray);
        localStorage.setItem("savedSearch", JSON.stringify(savedArray));
        localStorage.setItem("inputSaved", inputSaved);
        setLoading(false);

        savedArray.length === 0
          ? setMovieText("Ничего не найдено")
          : setMovieText("");
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
  };
  //

  // CHECK TOKEN METHOD
  const checkToken = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      MainApi.checkToken(token)
        .then(() => {
          setIsLogedIn(true);
          setIsLoaded(true);
          console.log(isLoggedIn);
          navigate("/movies");
        })
        .catch((err) => console.log(err));
    }
  };
  //
  useEffect(() => {
    checkToken();
    if (isLoggedIn) {
      MainApi.getUserInfo()
        .then((user) => {
          setCurrentUser(user);
          getSavedMovies();
          // navigate("/movies");
          if (localStorage.getItem("movies") === null) {
            localStorage.setItem("movies", JSON.stringify([]));
          }
          setMovies(JSON.parse(localStorage.getItem("movies")));
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoaded(true));
    } else {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div>
      <AllMovies.Provider value={movies}>
        <SavedMoviesContext.Provider value={savedMovies}>
          <CurrentUser.Provider value={currentUser}>
            {isLoaded ? (
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
                <Route path="/*" element={<PageNotFound />}></Route>
                <Route
                  path="/signin"
                  element={<Login onLogin={onLogin} statusText={statusText} />}
                ></Route>
                <Route
                  path="saved-movies"
                  element={
                    isLoggedIn ? (
                      <SavedMovies
                        savedMovies={savedMovies}
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
                        movies={movies}
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
            ) : null}

            <BurgerMenu
              isOpen={isBurgerOpen}
              closeBurger={closeBurger}
            ></BurgerMenu>
          </CurrentUser.Provider>
        </SavedMoviesContext.Provider>
      </AllMovies.Provider>
    </div>
  );
}

export default App;
