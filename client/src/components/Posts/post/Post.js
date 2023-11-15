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

    const user = JSON.parse(localStorage.getItem("profile"));

    // custom Like subcomponents
    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find(
                (like) => like === (user?.result?.googleId || user?.result?.id)
            ) ? (
                <>
                    <ThumbUpAltIcon fontSize="small" /> &nbsp;
                    {post.likes.length > 2
                        ? `You and ${post.likes.length - 1} others`
                        : `${post.likes.length} like ${
                              post.likes.length > 1 ? "s" : ""
                          }`}
                </>
            ) : (
                <>
                    <ThumbUpAltIcon fontSize="small" /> &nbsp;
                    {post.likes.length}
                    {post.likes.length === 1 ? "Like" : "Likes"}
                </>
            );
        } else {
            return (
                <>
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp; Like
                </>
            );
        }
    };

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
                        <Typography variant="h6">{post.name}</Typography>
                        {user?.result?.sub === post?.creator ||
                        user?.result?._id === post?.creator ? (
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
                        ) : (
                            <></>
                        )}
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
                            disabled={!user?.result}
                        >
                            <Likes />
                        </Button>
                    </CardActions>

                    <CardActions sx={{ px: 0 }}>
                        {user?.result?.sub === post?.creator ||
                        user?.result?._id === post?.creator ? (
                            <Button
                                onClick={() => {
                                    dispatch(deletePost(post._id));
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                                Delete{" "}
                            </Button>
                        ) : (
                            <></>
                        )}
                    </CardActions>
                </div>
            </CustomContainer>
        </CustomCard>
    );
};

export default Post;
