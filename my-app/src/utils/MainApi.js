// CHECK RESPONSE FROM SERVER METHOD
const checkResponseStatus = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};
//

const SERVER_URL = "http://api.kinopokaz.nomoredomains.work";

// REGISTARATION METHOD
export const registr = (email, password, name) => {
  return fetch(`${SERVER_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
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
  })
    .then((res) => checkResponseStatus(res))
    .then((data) => data);
};
//

// GET USER INFO METHOD
export const getUserInfo = (token) => {
  return fetch(`${SERVER_URL}/users/me`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponseStatus(res));
};
//

// CHANGE USER INFO METHOD
export const changeUsersInfo = (name, email, token) => {
  return fetch(`${SERVER_URL}/users/me`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "PATCH",
    body: JSON.stringify({ name, email }),
  }).then((res) => checkResponseStatus(res));
};
//

// ADD MOVIE TO SAVED METHOD
export const saveMovie = (data, token) => {
  return fetch(`${SERVER_URL}/movies`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: data.image,
      trailer: data.trailer,
      thumbnail: data.thumbnail,
      movieId: data.movieId,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    }),
  }).then((res) => checkResponseStatus(res));
};
// GET ALL SAVED MOVIES METHOD
export const getSavedMovies = (token) => {
  return fetch(`${SERVER_URL}/movies`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponseStatus(res));
};

export const deleteSavedMovie = (token, movieId) => {
  return fetch(`${SERVER_URL}/movies/` + movieId, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  }).then((res) => checkResponseStatus(res));
};
