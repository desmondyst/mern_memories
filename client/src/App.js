import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

    return (
        <>
            <ThemeProvider theme={theme}>
                {/* reset browser default styling */}
                <CssBaseline />
                <Container
                    maxWidth="xl"
                    sx={{
                        padding: { xs: "0" },
                        width: "100vw",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Router>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="auth" element={<Auth />} />
                        </Routes>
                    </Router>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default App;
