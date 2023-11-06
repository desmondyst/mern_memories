import React from "react";
import Post from "./post/Post";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
const Posts = () => {
    const posts = useSelector((state) => state.posts);

    console.log(posts);
    return (
        <>
            <h1> POSTS </h1>
            <Post />
            <Post />
        </>
    );
};

export default Posts;
