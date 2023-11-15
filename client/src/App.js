import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Container, CssBaseline } from "@mui/material";

import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
    return (
        <>
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
        </>
    );
};

export default App;
