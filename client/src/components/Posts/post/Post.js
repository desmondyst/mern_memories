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

const Post = ({ post }) => {
    return (
        <CustomCard>
            <CustomCardMedia image={post.selectedFile} title={post.title} />

            <CustomContainer
                className="details-container"
                sx={{ color: "white", zIndex: 2 }}
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
                            onClick={() => {}}
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

                    <Typography variant="h5">{post.message}</Typography>
                </CardContent>

                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <CardActions sx={{ px: 0 }}>
                        <Button onClick={() => {}}>
                            <ThumbUpAltIcon fontSize="small" />
                            Like {post.likeCount}
                        </Button>
                    </CardActions>

                    <CardActions sx={{ px: 0 }}>
                        <Button onClick={() => {}}>
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
