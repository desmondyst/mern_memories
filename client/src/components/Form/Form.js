import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { CustomTextField, CustomButton } from "./styles";
import ImageConverter from "./imageConverter";

const Form = ({ currentId, setCurrentId }) => {
    let [postData, setPostData] = useState({
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
    });

    const post = useSelector((state) =>
        currentId ? state.posts.posts.find((p) => p._id == currentId) : null
    );

    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (post) {
            setPostData(post);
        }
    }, [post]);

    const dispatch = useDispatch();

    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: "",
            message: "",
            tags: "",
            selectedFile: "",
        });
    };

    const handleSubmit = (e) => {
        // prevent refresh

        e.preventDefault();

        postData = {
            ...postData,
            tags: postData.tags.map((tag) => tag.toLowerCase()),
        };

        if (currentId) {
            dispatch(
                updatePost(currentId, { ...postData, name: user?.result?.name })
            );
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
        clear();
    };

    if (!user?.result?.name) {
        return (
            <Paper sx={{ padding: "1rem", borderRadius: "1rem" }} elevation={6}>
                <Typography variant="h6">
                    {" "}
                    Please Sign in to create your own memories or like other's
                    memories
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper sx={{ padding: "1rem", borderRadius: "1rem" }} elevation={6}>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <Typography variant="h6">
                    {" "}
                    {currentId ? "Editing" : "Creating"} a Memory{" "}
                </Typography>

                <CustomTextField
                    required
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
                    required
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
                    required
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

                {/* <div style={{ margin: "1rem 0" }} required>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                            setPostData({ ...postData, selectedFile: base64 })
                        }
                    />
                </div> */}

                <ImageConverter postData={postData} setPostData={setPostData} />

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
