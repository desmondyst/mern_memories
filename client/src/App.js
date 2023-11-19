import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
    Container,
    CssBaseline,
    ThemeProvider,
    createTheme,
} from "@mui/material";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetail from "./components/PostDetails/PostDetail";
import { CustomAppContainer } from "./styles";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { INITIALISED_SYSTEM_MODE } from "./constants/actionTypes";

const App = () => {
    const dispatch = useDispatch();

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    // initialised system preferred mode
    useEffect(() => {
        dispatch({
            type: INITIALISED_SYSTEM_MODE,
            defaultMode: prefersDarkMode ? "dark" : "light",
        });
    }, []);

    const { mode } = useSelector((state) => state.settings);

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );

    return (
        <>
            <ThemeProvider theme={theme}>
                {/* reset browser default styling */}
                <CssBaseline />
                <ToastContainer draggable={false} />
                <CustomAppContainer maxWidth="xl">
                    <Router>
                        <Navbar />
                        <Routes>
                            <Route
                                exact
                                path="/"
                                element={<Navigate to="/posts" />}
                            />
                            <Route exact path="/posts" element={<Home />} />
                            <Route
                                exact
                                path="/posts/search"
                                element={<Home />}
                            />
                            <Route
                                exact
                                path="/posts/:id"
                                element={<PostDetail />}
                            />
                            <Route exact path="auth" element={<Auth />} />
                        </Routes>
                    </Router>
                </CustomAppContainer>
            </ThemeProvider>
        </>
    );
};

export default App;
