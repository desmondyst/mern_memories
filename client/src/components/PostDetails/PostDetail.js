import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../actions/posts";
import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import moment from "moment";

import { CustomImage, CustomPaper } from "./styles";

const PostDetail = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);

    //  checks
    if (!post) {
        return null;
    }

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <div>
            <CustomPaper elevation={6}>
                <Grid container p={"1.2rem"}>
                    <Grid item xs={12} md={8}>
                        <Box className="details-container" mb={"1rem"}>
                            <Typography
                                gutterBottom
                                variant="h3"
                                component="h2"
                                color="text.primary"
                                sx={{ textTransform: "capitalize" }}
                            >
                                {post.title}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="h2"
                                color="textSecondary"
                            >
                                {post.tags.map((tag) => `#${tag} `)}
                            </Typography>
                            <Typography gutterBottom color="text.primary">
                                {post.message}
                            </Typography>
                            <Typography>Created by {post.name}</Typography>
                            <Typography
                                variant="body"
                                fontSize={"0.8rem"}
                                color="textSecondary"
                            >
                                {moment(post.createdAt).fromNow()}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4} maxHeight={"100%"}>
                        <CustomImage src={post.selectedFile} />
                    </Grid>
                </Grid>
            </CustomPaper>
        </div>
    );
};

export default PostDetail;
