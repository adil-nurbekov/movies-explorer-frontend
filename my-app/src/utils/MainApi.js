// CHECK RESPONSE FROM SERVER METHOD
const checkResponseStatus = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};
//

const SERVER_URL = "https://api.kinopokaz.nomoredomains.work";
// const SERVER_URL = "http://localhost:5000";

// REGISTARATION METHOD
export const registr = (name, email, password) => {
  return fetch(`${SERVER_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => checkResponseStatus(res));
};
//

// LOGIN METHOD
export const login = (email, password) => {
  return fetch(`${SERVER_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => checkResponseStatus(response))
    .then((res) => {
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        return res;
      } else {
        return;
      }
    });
};
//

// CHECK TOKEN METHOD
export const checkToken = (token) => {
  return fetch(`${SERVER_URL}/users/me`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponseStatus(res));
};
//

// GET USER INFO METHOD
export const getUserInfo = () => {
  return fetch(`${SERVER_URL}/users/me`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then((res) => checkResponseStatus(res));
};
//

// CHANGE USER INFO METHOD
export const changeUsersInfo = (name, email) => {
  return fetch(`${SERVER_URL}/users/me`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    method: "PATCH",
    body: JSON.stringify({ name, email }),
  }).then((res) => checkResponseStatus(res));
};
//

// ADD MOVIE TO SAVED METHOD
export const saveMovie = (data) => {
  return fetch(`${SERVER_URL}/movies`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    method: "POST",
    body: JSON.stringify({
      country: data.country === null ? "неизвестно" : data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: `https://api.nomoreparties.co${data.image.url}`,
      trailer: data.trailerLink,
      thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
      movieId: data.id,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    }),
  }).then((res) => checkResponseStatus(res));
};
// GET ALL SAVED MOVIES METHOD
export const getSavedMovies = () => {
  return fetch(`${SERVER_URL}/movies`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then((res) => checkResponseStatus(res));
};

export const deleteSavedMovie = (movieId) => {
  return fetch(`${SERVER_URL}/movies/` + movieId, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    method: "DELETE",
  }).then((res) => checkResponseStatus(res));
};
