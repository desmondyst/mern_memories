import React, { useEffect, useState } from "react";
import { Container, Grow, Grid } from "@mui/material";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";

import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

const Home = () => {
    const dispatch = useDispatch();

    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
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
    );
};

export default Home;
