import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { CustomTextField, CustomButton } from "./styles";

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
    });

    const post = useSelector((state) =>
        currentId ? state.posts.find((p) => p._id == currentId) : null
    );

    useEffect(() => {
        if (post) {
            setPostData(post);
        }
    }, [post]);

    const dispatch = useDispatch();

    const clear = () => {
        setCurrentId(null);
        setPostData({
            creator: "",
            title: "",
            message: "",
            tags: "",
            selectedFile: "",
        });
    };

    const handleSubmit = (e) => {
        // prevent refresh
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, postData));
        } else {
            dispatch(createPost(postData));
        }
        clear();
    };

    return (
        <Paper sx={{ padding: "1rem", borderRadius: "1rem" }}>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">
                    {" "}
                    {currentId ? "Editing" : "Creating"} a Memory{" "}
                </Typography>
                <CustomTextField
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={(e) =>
                        setPostData({ ...postData, creator: e.target.value })
                    }
                />

                <CustomTextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) =>
                        setPostData({ ...postData, title: e.target.value })
                    }
                />

                <CustomTextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) =>
                        setPostData({ ...postData, message: e.target.value })
                    }
                />

                <CustomTextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) =>
                        setPostData({
                            ...postData,
                            tags: e.target.value.split(","),
                        })
                    }
                />

                <div style={{ margin: "1rem 0" }}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                            setPostData({ ...postData, selectedFile: base64 })
                        }
                    />
                </div>

                <CustomButton
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                >
                    Submit
                </CustomButton>

                <CustomButton
                    variant="contained"
                    color="secondary"
                    size="small"
                    fullWidth
                    onClick={clear}
                >
                    Clear
                </CustomButton>
            </form>
        </Paper>
    );
};

export default Form;
