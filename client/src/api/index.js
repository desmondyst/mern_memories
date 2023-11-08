import axios from "axios";

// const url = "http://localhost:5000/posts";
const url = "https://mern-memories-api.onrender.com/posts";

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const updatePost = (id, updatedPost) =>
    axios.patch(`${url}/${id}`, updatedPost);

// #TODO: The extra {} will cause error
// export const updatePost = (id, updatedPost) => {
//     axios.patch(`${url}/${id}`, updatedPost);
// };

export const likePost = (id) => axios.patch(`${url}/${id}/LikePost`);
