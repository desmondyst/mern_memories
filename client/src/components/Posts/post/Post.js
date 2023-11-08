import React from "react";
import moment from "moment";
import {
    CardActions,
    CardContent,
    Button,
    Typography,
    Container,
} from "@mui/material";

import { CustomCard, CustomCardMedia, CustomContainer } from "./styles";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";
const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    return (
        <CustomCard>
            <CustomCardMedia image={post.selectedFile} title={post.title} />

            <CustomContainer
                className="details-container"
                sx={{ color: "white", zIndex: 2, height: "100%" }}
            >
                <div className="creator-time-container">
                    <div
                        className="creator-horizon-container"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="h6">{post.creator}</Typography>

                        <MoreHorizIcon
                            sx={{
                                ":hover": {
                                    cursor: "pointer",
                                    color: "red",
                                },
                            }}
                            onClick={() => {
                                setCurrentId(post._id);
                            }}
                        />
                    </div>
                    <Typography variant="body2">
                        {moment(post.createdAt).fromNow()}
                    </Typography>
                </div>

                <CardContent sx={{ px: 0, mt: "7rem", color: "black" }}>
                    <div>
                        <Typography variant="body2">
                            {post.tags.map((tag) => `#${tag} `)}
                        </Typography>
                    </div>

                    <Typography variant="h5">{post.title}</Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {post.message}
                    </Typography>
                </CardContent>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "auto",
                    }}
                >
                    <CardActions sx={{ px: 0 }}>
                        <Button
                            onClick={() => {
                                dispatch(likePost(post._id));
                            }}
                        >
                            <ThumbUpAltIcon fontSize="small" />
                            Like {post.likeCount}
                        </Button>
                    </CardActions>

                    <CardActions sx={{ px: 0 }}>
                        <Button
                            onClick={() => {
                                dispatch(deletePost(post._id));
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                            Delete{" "}
                        </Button>
                    </CardActions>
                </div>
            </CustomContainer>
        </CustomCard>
    );
};

export default Post;
