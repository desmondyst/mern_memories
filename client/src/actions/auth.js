import * as api from "../api";
import { AUTH } from "../constants/actionTypes.js";
// we cant import useNavigate here as it has to be inside react functional component and not javascript function => we have to pass in from the caller
// import { useNavigate } from "react-router-dom";

// Action Creators (function that return actions)

// export const getPosts = () => async (dispatch) => {
//     try {
//         const { data } = await api.fetchPosts();
//         const action = { type: FETCH_ALL, payload: data };
//         dispatch(action);
//     } catch (error) {
//         console.log(error);
//     }
// };

export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        // sign the user in
        const { data } = await api.signIn(formData);

        const action = { type: AUTH, data };
        dispatch(action);

        // redirect back to home

        navigate("/");
    } catch (error) {
        console.log(error);
    }
};

export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        // sign the user up
        const { data } = await api.signUp(formData);
        const action = { type: AUTH, data };
        dispatch(action);

        // redirect back to home

        navigate("/");
    } catch (error) {
        console.log(error);
    }
};
