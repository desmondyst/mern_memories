import React, { useEffect, useState } from "react";

import { Container, Grow, Grid } from "@mui/material";

import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import memories from "./images/memories.jpg";

import { CustomAppBar, CustomTypography } from "./styles";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";

const App = () => {
    const dispatch = useDispatch();

    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Container maxWidth="lg">
            <CustomAppBar position="static" color="inherit">
                <CustomTypography variant="h2" align="center">
                    Memories
                </CustomTypography>
                <img src={memories} alt="memories" height="60" />
            </CustomAppBar>
            <Grow in>
                <Container>
                    <Grid
                        container
                        justify="space-between"
                        alignItems="stretch"
                        spacing={3}
                        sx={{
                            flexDirection: { xs: "column-reverse", md: "row" },
                        }}
                    >
                        <Grid item xs={12} sm={7}>
                            <Posts
                                currentId={currentId}
                                setCurrentId={setCurrentId}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form
                                currentId={currentId}
                                setCurrentId={setCurrentId}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
};

export default App;
