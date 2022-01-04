const checkResponseStatus = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

export const getAllMovies = () => {
  return fetch("https://api.nomoreparties.co/beatfilm-movies", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => checkResponseStatus(res));
};
