import { toast } from "react-toastify";
import * as api from "../api";
import {
    FETCH_ALL,
    FETCH_BY_SEARCH,
    CREATE,
    UPDATE,
    DELETE,
} from "../constants/actionTypes.js";

// Action Creators (function that return actions)

export const getPosts = (page) => async (dispatch) => {
    try {
        // this data is an object of {data: Array(2), numberOfPages: 1}

        const { data } = await api.fetchPosts(page);
        const action = { type: FETCH_ALL, payload: data };
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data } = await api.fetchPostsBySearch(searchQuery);

        const action = { type: FETCH_BY_SEARCH, payload: data };
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        console.log(post);
        const { data } = await api.createPost(post);
        const action = { type: CREATE, payload: data };
        dispatch(action);
        toast.success("Post created successfully");
    } catch (error) {
        toast.error("Error creating post");
        console.log(error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        const action = { type: UPDATE, payload: data };
        dispatch(action);
        toast.success("Post updated successfully");
    } catch (error) {
        toast.error("Error updating post");
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        const action = { type: DELETE, payload: id };
        dispatch(action);
        toast.success("Post deleted successfully");
    } catch (error) {
        console.log(error);
        toast.error("Error deleting post");
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        const action = { type: UPDATE, payload: data };
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
};
