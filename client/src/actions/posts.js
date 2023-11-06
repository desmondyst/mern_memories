import * as api from "../api";

// Action Creators (function that return actions)

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        const action = { type: "FETCH_ALL", payload: data };
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
};

export const createPost = (post) => async (dispatch) => {
    console.log("called");
    try {
        const { data } = await api.createPost(post);
        const action = { type: "CREATE", payload: data };
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
};
