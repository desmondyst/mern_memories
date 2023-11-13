import { AUTH, LOGOUT } from "../constants/actionTypes.js";

/**
 * in the reducer, we do action.data because in the actions, we do const action = { type: AUTH, data };
 *
 */

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem("profile", JSON.stringify(action.data));
            return { ...state, authData: action.data };
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        default:
            return state;
    }
};

export default authReducer;
