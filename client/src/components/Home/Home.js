import React, { useEffect, useState } from "react";
import { Container, Grow, Grid } from "@mui/material";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";

import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import { useLocation } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();

    const [currentId, setCurrentId] = useState(null);
    const location = useLocation();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch, location]);

    return (
        <Grow in>
            <Container maxWidth={false}>
                <Grid
                    container
                    justify="space-between"
                    alignItems="stretch"
                    spacing={3}
                    p={0}
                    sx={{
                        flexDirection: { xs: "column-reverse", md: "row" },
                    }}
                >
                    <Grid item xs={12} md={10} lg={9}>
                        <Posts
                            currentId={currentId}
                            setCurrentId={setCurrentId}
                        />
                    </Grid>
                    <Grid item xs={12} md={2} lg={3}>
                        <Form
                            currentId={currentId}
                            setCurrentId={setCurrentId}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
