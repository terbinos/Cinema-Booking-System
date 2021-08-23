import axios from "axios";
import BASE_URL from "../utils/baseUrl";
import {
  GET_ERRORS,
  SHOWS_LOADING,
  GET_SHOW,
  GET_SHOWS,
} from "./types";

import { clearErrors } from "./movieActions";
import { notification } from "antd";

const successMessage = (successText) => {
  notification["success"]({
    message: "Confirmation",
    description: successText,
  });
};

// Create Movie
export const addShow = (showData) => (dispatch) => {
  axios
    .post(BASE_URL + "/show", showData)
    .then((res) => {
      if (res.data.success) {
        dispatch(clearErrors);
        successMessage("Show added successfully!");
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

// Get a Single Show
export const getShow = (showId) => (dispatch) => {
  dispatch(setShowsLoading());
  axios
    .get(`${BASE_URL}/show/${showId}`)
    .then((res) => {
      dispatch({
        type: GET_SHOW,
        payload: res.data,
      });
    })
    .catch(() =>
      dispatch({
        type: GET_SHOW,
        payload: null,
      })
    );
};

// Get all shows
export const getShows = () => (dispatch) => {
  dispatch(setShowsLoading());
  axios
    .get(BASE_URL +"/show")
    .then((res) => {
      dispatch({
        type: GET_SHOWS,
        payload: res.data,
      });
    })
    .catch(() =>
      dispatch({
        type: GET_SHOWS,
        payload: null,
      })
    );
};

export const editShow = (show) => (dispatch) => {
  dispatch(clearErrors);
  axios
    .put(`${BASE_URL}/show/${show.id}/?cinema=${show.cinema}&movie=${show.movie}&showDay=${show.showDay}&showTime=${show.showTime}`)
    .then((res) => {
      if (res.data.success) {
        successMessage("Show updated Successfully");
        dispatch(getShows());
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

// Delete show
export const deleteShow = (showId) => (dispatch) => {
  axios
    .delete(`${BASE_URL}/show/${showId}`)
    .then((res) => {
      dispatch(clearErrors);
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
      if (res.data.success) {
        successMessage("Show deleted Successfully");
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

// Show Loading
export const setShowsLoading = () => {
  return {
    type: SHOWS_LOADING,
  };
};
