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
import { CustomAppContainer } from "./styles";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? "dark" : "light",
                },
            }),
        [prefersDarkMode]
    );

    const user = JSON.parse(localStorage.getItem("profile"));

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
                            <Route exact path="/posts/:id" element={<Home />} />
                            <Route
                                exact
                                path="auth"
                                element={
                                    !user ? <Auth /> : <Navigate to="/posts" />
                                }
                            />
                        </Routes>
                    </Router>
                </CustomAppContainer>
            </ThemeProvider>
        </>
    );
};

export default App;
