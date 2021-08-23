import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";
const initialState = {
    errors: null,
};

// eslint-disable-next-line
export default function(state = initialState, action){
    switch(action.type){
        case GET_ERRORS:
            return action.payload
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };  
        default:
            return state;
    }
}