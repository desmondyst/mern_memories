import axios from "axios";

// creating an axios instance
const API = axios.create({ baseURL: "http://localhost:5000" });
// const API = axios.create({ baseURL: "https://mern-memories-api.onrender.com" });

// const url = "http://localhost:5000/posts";
// const url = "https://mern-memories-api.onrender.com/posts";

// interceptors before calling the APIS becuase we need send our user token to the backend so backend can verify (in the middleware in backend)
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }

    // return req so it can be used to make all the future request below
    return req;
});

export const fetchPosts = () => API.get("/posts");

export const createPost = (newPost) => API.post("/posts", newPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const updatePost = (id, updatedPost) =>
    API.patch(`/posts/${id}`, updatedPost);

// #TODO: The extra {} will cause error
// export const updatePost = (id, updatedPost) => {
//     axios.patch(`${url}/${id}`, updatedPost);
// };

export const likePost = (id) => API.patch(`/posts/${id}/LikePost`);

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
