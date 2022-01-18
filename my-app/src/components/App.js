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
import {
  ERROR_401,
  ERROR_409,
  ERROR_ELSE,
  CHANGE_SUCCESS,
  ERROR_SERVER,
  NOT_FOUND,
} from "../utils/constants";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [movieText, setMovieText] = useState("");
  const [movies, setMovies] = useState([]);
  const [renderMovies, setRenderMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLogedIn] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);

  const [savedChecked, setSavedChecked] = useState(false);

  const [checked, setChecked] = useState(false);
  // BURGER MENU
  const closeBurger = () => {
    setIsBurgerOpen(false);
  };
  const handleBurgerMenu = () => {
    setIsBurgerOpen(true);
  };
  //

  // GET USERS INFO
  const getUsersInfo = () => {
    MainApi.getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // LOGIN
  const onLogin = (email, password) => {
    MainApi.login(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        getUsersInfo();
        setIsLogedIn(true);
        setIsLoaded(true);
        navigate("/movies");
      })
      .catch((err) => {
        if (err === 401) {
          setStatusText(ERROR_401);
        } else {
          setStatusText(ERROR_ELSE);
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
          setStatusText(ERROR_409);
        } else {
          setStatusText(ERROR_ELSE);
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
        setStatusText(CHANGE_SUCCESS);
        setTimeout(() => {
          setStatusText("");
        }, 2000);
      })
      .catch((err) => {
        if (err === 409) {
          setStatusText(ERROR_409);
        } else {
          setStatusText(ERROR_ELSE);
        }
        setTimeout(() => {
          setStatusText("");
        }, 2000);
        console.log(err);
      });
  };
  //

  // GET ALL MOVIES
  const getAllMovies = () => {
    MovieApi.getAllMovies()
      .then((allMovies) => {
        localStorage.setItem("allMovies", JSON.stringify(allMovies));
        setMovies(allMovies);
      })
      .catch((err) => {
        console.log(err);
        setMovieText(ERROR_SERVER);
        setTimeout(() => {
          setMovieText("");
        }, 2000);
      });
  };

  // GET SAVED MOVIES
  const getSavedMovies = () => {
    MainApi.getSavedMovies()
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
        console.log(savedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
      })
      .catch((err) => {
        console.log(err);
        setMovieText(ERROR_SERVER);
        setTimeout(() => {
          setMovieText("");
        }, 2000);
      });
  };

  // SAVE MOVIE
  const saveMovie = (card) => {
    MainApi.saveMovie(card)
      .then(() => {
        getSavedMovies();
      })
      .catch((err) => {
        setMovieText(ERROR_ELSE);
        console.log(err);
        setTimeout(() => {
          setMovieText("");
        }, 2000);
      });
  };
  //

  // DELETE MOVIE FROM MOVIE PAGE
  const deleteMovie = (movie) => {
    const id = savedMovies.find((card) => card.movieId === movie.id);
    MainApi.deleteSavedMovie(id._id)
      .then(() => {
        getSavedMovies();
        // setSavedMovies(savedMovies.filter((item) => item._id !== deleted._id));
      })
      .catch((err) => {
        setMovieText(ERROR_ELSE);
        console.log(err);
        setTimeout(() => {
          setMovieText("");
        }, 2000);
      });
  };
  //

  // DELETE MOVIE FROM SAVED MOVIE PAGE
  const deleteCard = (card) => {
    MainApi.deleteSavedMovie(card._id)
      .then(() => {
        getSavedMovies();
        // setSavedMovies(savedMovies.filter((item) => item._id !== deleted._id));
      })
      .catch((err) => {
        setMovieText(ERROR_ELSE);
        console.log(err);
        setTimeout(() => {
          setMovieText("");
        }, 2000);
      });
  };
  //

  // HANDLE SEARCH BUTTON
  const findMovies = (input) => {
    setLoading(true);

    localStorage.setItem("input", input);

    const moviesArray = movies.filter((m) =>
      JSON.stringify(m.nameRU || m.nameEN)
        .toLowerCase()
        .includes(input.toLowerCase())
    );
    if (moviesArray.length === 0) {
      setMovieText(NOT_FOUND);
      localStorage.setItem("findedMovies", JSON.stringify(moviesArray));
      setRenderMovies([]);
    } else {
      setMovieText("");
      localStorage.setItem("findedMovies", JSON.stringify(moviesArray));
      setRenderMovies(moviesArray);
      console.log(moviesArray);
    }

    setLoading(false);

    setTimeout(() => {
      setMovieText("");
    }, 1000);
  };

  // SIGN OUT METHOD
  const signOut = () => {
    localStorage.clear();
    setIsLogedIn(false);
  };
  //

  // CHECK TOKEN METHOD
  const checkToken = () => {
    if (localStorage.getItem("token")) {
      MainApi.checkToken()
        .then(() => {
          setIsLogedIn(true);
        })
        .catch((err) => console.log(err));
    } else {
      setIsLoaded(true);
    }
  };
  //
  useEffect(() => {
    checkToken();
    if (isLoggedIn) {
      getUsersInfo();

      setIsLoaded(true);

      getAllMovies();

      getSavedMovies();
      if (JSON.parse(localStorage.getItem("findedMovies")) !== null)
        setRenderMovies(JSON.parse(localStorage.getItem("findedMovies")));
      setRenderMovies(renderMovies);
    }
  }, [isLoggedIn]);

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
                    isLoggedIn ? (
                      <Navigate to={"/"} />
                    ) : (
                      <Register
                        onRegister={onRegister}
                        statusText={statusText}
                      />
                    )
                  }
                ></Route>
                <Route path="/*" element={<PageNotFound />}></Route>
                <Route
                  path="/signin"
                  element={
                    isLoggedIn ? (
                      <Navigate to={"/"} />
                    ) : (
                      <Login onLogin={onLogin} statusText={statusText} />
                    )
                  }
                ></Route>
                <Route
                  path="saved-movies"
                  element={
                    isLoggedIn ? (
                      <SavedMovies
                        savedMovies={savedMovies}
                        handleBurgerMenu={handleBurgerMenu}
                        deleteCard={deleteCard}
                        loading={loading}
                        isLogedIn={isLoggedIn}
                        movieText={movieText}
                        savedChecked={savedChecked}
                        setSavedMovies={setSavedMovies}
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
                        movies={renderMovies}
                        handleBurgerMenu={handleBurgerMenu}
                        saveMovie={saveMovie}
                        deleteMovie={deleteMovie}
                        findMovies={findMovies}
                        loading={loading}
                        movieText={movieText}
                        isLogedIn={isLoggedIn}
                        checked={checked}
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
            ) : (
              <PagePreloader></PagePreloader>
            )}

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
