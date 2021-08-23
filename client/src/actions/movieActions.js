import axios from "axios";
import BASE_URL from "../utils/baseUrl";
import {
  GET_ERRORS,
  MOVIES_LOADING,
  GET_MOVIE,
  GET_MOVIES,
} from "./types";

import { notification } from "antd";

const successMessage = (successText) => {
  notification["success"]({
    message: "Confirmation",
    description: successText,
  });
};

// Create Movie
export const addMovie = (movieData) => (dispatch) => {
  axios
    .post(BASE_URL + "/movie", movieData)
    .then((res) => {
      if (res.data.success) {
        dispatch(clearErrors);
        successMessage("Movie added successfully!");
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: res.data,
        });
      }
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Get a Single Movie
export const getMovie = (movieId) => (dispatch) => {
  dispatch(setMoviesLoading());
  axios
    .get(`${BASE_URL}/movie/${movieId}`)
    .then((res) => {
      dispatch({
        type: GET_MOVIE,
        payload: res.data,
      });
    })
    .catch(() =>
      dispatch({
        type: GET_MOVIE,
        payload: null,
      })
    );
};

// Get all movies
export const getMovies = () => (dispatch) => {
  dispatch(setMoviesLoading());
  axios
    .get(BASE_URL +"/movie")
    .then((res) => {
      dispatch({
        type: GET_MOVIES,
        payload: res.data,
      });
    })
    .catch(() =>
      dispatch({
        type: GET_MOVIES,
        payload: null,
      })
    );
};

// Edit movie
export const editMovie = (movie) => (dispatch) => {
  dispatch(clearErrors);
  const updateUrl = `${BASE_URL}/movie/${movie.id}/?title=${movie.title}&genre=${movie.genre}&description=${movie.description}&trailerUrl=${movie.trailerUrl}&imageUrl=${movie.imageUrl}`
  axios
    .put(updateUrl)
    .then((res) => {
      if (res.data.success) {
        successMessage("Movie updated Successfully");
        dispatch(getMovies());
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: res.data,
        });
      }
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Delete movie
export const deleteMovie = (movieId) => (dispatch) => {
  axios
    .delete(`${BASE_URL}/movie/${movieId}`)
    .then((res) => {
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
      if (res.data.success) {
        successMessage("Movie deleted Successfully");
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: res.data,
        });
      }
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
 
// Clear Errors
export const clearErrors = () => {
  return {
    type: GET_ERRORS,
    payload: {}

  }
}

// Movie Loading
export const setMoviesLoading = () => {
  return {
    type: MOVIES_LOADING,
  };
};

