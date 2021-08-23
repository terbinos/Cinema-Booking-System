import isEmpty from '../validation/is-empty';
import { GET_CURRENT_USER, SET_CURRENT_USER } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {},
    currentUser:{}
}

// eslint-disable-next-line
export default function(state = initialState, action){
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case GET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}