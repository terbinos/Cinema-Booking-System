import axios from "axios";
import jwt_decode from "jwt-decode";
import BASE_URL from "../utils/baseUrl";
import setAuthToken from "../utils/setAuthToken";
import { GET_CURRENT_USER, GET_ERRORS, SET_CURRENT_USER } from "./types";
import { notification } from "antd";

const successMessage = (successText) => {
    notification["success"]({
      message: 'Confirmation',
      description: successText,
    });
  };

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post(BASE_URL+"/registration", userData)
    .then((res) => {
      if (res.data.success) {
        successMessage("Registered Successfully");
        setTimeout(() => {
            history.push("/login");
        }, 2000);
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

// Login - Get User Token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post(BASE_URL+"/authenticate", userData)
    .then((res) => {
      if (res.data.success) {
        // Save token to localStorage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
        dispatch({
            type: GET_ERRORS,
            payload: {},
          });
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

export const getCurrentUser = (userEmail) => (dispatch)=> {
  axios
    .post(BASE_URL +"/current", {email:userEmail})
    .then((res) => {
      dispatch({
        type: GET_CURRENT_USER,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );

}
// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Log user out 
export const logoutUser = (history) => (dispatch) => {
    // Remove token from localstorage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));

    history.push("/");
}
