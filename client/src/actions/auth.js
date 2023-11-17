import * as api from "../api";
import { AUTH } from "../constants/actionTypes.js";
import { toast } from "react-toastify";
// we cant import useNavigate here as it has to be inside react functional component and not javascript function => we have to pass in from the caller
// import { useNavigate } from "react-router-dom";

// Action Creators (function that return actions)

export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        // sign the user in
        const { data } = await api.signIn(formData);

        const action = { type: AUTH, data };
        dispatch(action);

        // redirect back to home
        toast.success("Logged in successfully");

        navigate("/");
    } catch (error) {
        toast.error("Invalid Credentials");
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
