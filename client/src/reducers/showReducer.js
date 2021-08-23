import { GET_SHOW, GET_SHOWS, SHOWS_LOADING } from "../actions/types";

const initialState = {
  show: null,
  shows: null,
  loading: false,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case SHOWS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_SHOW:
      return {
        ...state,
        show: action.payload,
        loading: false,
      };
    case GET_SHOWS:
      return {
        ...state,
        shows: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
