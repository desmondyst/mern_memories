import React from "react";
import Post from "./post/Post";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Grid, CircularProgress, Typography, Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";
const Posts = ({ setCurrentId }) => {
    // the posts in state.posts refer to posts REDUCER
    const { posts, isLoading } = useSelector((state) => state.posts);

    let [searchParams] = useSearchParams();

    if (!posts?.length && !isLoading) {
        return (
            <Container>
                <Typography variant="h6" fontSize={"2rem"}>
                    No post found!
                </Typography>
            </Container>
        );
    }

    return isLoading ? (
        <CircularProgress />
    ) : (
        <Grid container alignItems="stretch" spacing={3}>
            {posts.map((post) => (
                <Grid item key={post._id} xs={12} md={6} lg={4} xl={3}>
                    <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;
