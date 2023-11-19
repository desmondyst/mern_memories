import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const CommentSection = ({ post }) => {
    // const [comments, setCommments] = useState([1, 2, 3, 4]);
    // const [comment, setComment] = useState("");

    // const user = JSON.parse(localStorage.getItem("profile"));

    // const handleClick = () => {
    //     const commentWithUser = `${user.result.name}: ${comment}`;
    //     dispatchEvent(commentPost(commentWithUser));
    // };

    return (
        <Box>
            {/* <Typography variant="h6"> Comments</Typography>
            {comments.map((comment, i) => (
                <Typography key={i} gutterBottom variant="subtitle1">
                    Comment{i}
                </Typography>
            ))}
            <Typography variant="h6"> Write a Comment</Typography>
            <TextField
                fullWidth
                rows={4}
                variant="outlined"
                label="Comment"
                multiline
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Button
                fullWidth
                color="primary"
                disabled={!comment}
                variant="contained"
                onClick={handleClick}
            >
                Comment
            </Button> */}
        </Box>
    );
};

export default CommentSection;
