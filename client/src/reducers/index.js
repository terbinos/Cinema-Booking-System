import { combineReducers } from 'redux';
import authReducer from './authReducer';
import movieReducer from './movieReducer';
import showReducer from './showReducer';
import errorReducer from './errorReducer';


export default combineReducers({
    auth: authReducer,
    movie: movieReducer,
    show: showReducer,
    errors: errorReducer
});
