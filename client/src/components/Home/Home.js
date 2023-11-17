import React, { useEffect, useState } from "react";
import {
    Container,
    Grow,
    Grid,
    Chip,
    Paper,
    Box,
    AppBar,
    TextField,
    ListItem,
    Button,
} from "@mui/material";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";

import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import { useLocation, useSearchParams } from "react-router-dom";
import Pagination from "../Posts/Pagination";

import Search from "./Search";

const Home = () => {
    const dispatch = useDispatch();

    const [currentId, setCurrentId] = useState(null);
    const location = useLocation();

    let [searchParams] = useSearchParams();

    const page = searchParams.get("page") || 1;

    const searchQuery = searchParams.get("searchQuery");
    const tagsQuery = searchParams.get("tags");

    useEffect(() => {
        if (!searchQuery && !tagsQuery) {
            dispatch(getPosts(page));
        } else {
            dispatch(
                getPostsBySearch({ search: searchQuery, tags: tagsQuery })
            );
        }
    }, [currentId, dispatch, location, page]);

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
                        <Box>
                            <Search />
                            <Form
                                currentId={currentId}
                                setCurrentId={setCurrentId}
                            />
                            {!searchQuery && !tagsQuery && (
                                <Pagination currentPage={page} />
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
