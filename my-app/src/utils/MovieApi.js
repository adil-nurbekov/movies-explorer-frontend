import { MOVIES_SERVER_URL } from "./constants";
const checkResponseStatus = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

export const getAllMovies = () => {
  return fetch(MOVIES_SERVER_URL, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => checkResponseStatus(res));
};
