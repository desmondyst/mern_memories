import * as api from "../api";
import { AUTH } from "../constants/actionTypes.js";
import { useNavigate } from "react-router-dom";

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

export const signIn = () => async (dispatch) => {
    const navigate = useNavigate();
    try {
        // sign the user in

        // redirect back to home

        navigate("/");
    } catch (error) {
        console.log(error);
    }
};

export const signUp = () => async (dispatch) => {
    const navigate = useNavigate();
    try {
        // sign the user up

        // redirect back to home

        navigate("/");
    } catch (error) {
        console.log(error);
    }
};
