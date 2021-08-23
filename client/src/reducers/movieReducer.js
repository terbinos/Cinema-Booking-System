import { GET_MOVIE, GET_MOVIES, MOVIES_LOADING } from "../actions/types";

const initialState = {
  movie: null,
  movies: null,
  loading: false,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case MOVIES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_MOVIE:
      return {
        ...state,
        movie: action.payload,
        loading: false,
      };
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
