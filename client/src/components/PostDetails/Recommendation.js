import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Recommendation = ({ recommendedPost }) => {
    const navigate = useNavigate();

    const openPost = (_id) => {
        navigate(`/posts/${_id}`);
    };
    return (
        <>
            {recommendedPost.length > 0 && (
                <Box marginTop="2rem">
                    <Typography variant="h6"> You might also like: </Typography>
                    <Divider />
                    <Grid
                        container
                        className="recommendation_container"
                        gap={4}
                        mt={"1rem"}
                    >
                        {recommendedPost.map(
                            ({
                                title,
                                message,
                                name,
                                likes,
                                selectedFile,
                                _id,
                            }) => (
                                <Grid
                                    item
                                    xs={12}
                                    md={3}
                                    className="each_recommendation"
                                    key={_id}
                                    sx={{
                                        cursor: "pointer",
                                        ":hover": { opacity: "0.5" },
                                    }}
                                    onClick={() => openPost(_id)}
                                >
                                    <Typography
                                        gutterBottom
                                        fontWeight={500}
                                        color="text.primary"
                                        sx={{ textTransform: "capitalize" }}
                                    >
                                        {title}
                                    </Typography>
                                    <Typography gutterBottom fontSize="0.8rem">
                                        {name}
                                    </Typography>
                                    <Typography gutterBottom fontSize="0.8rem">
                                        {message}
                                    </Typography>
                                    <Typography gutterBottom fontSize="0.8rem">
                                        Likes: {likes.length}
                                    </Typography>
                                    <img
                                        src={selectedFile}
                                        height="200px"
                                        style={{
                                            maxWidth: "300px",
                                            borderRadius: "1rem",
                                        }}
                                    />
                                </Grid>
                            )
                        )}
                    </Grid>
                </Box>
            )}
        </>
    );
};

export default Recommendation;
