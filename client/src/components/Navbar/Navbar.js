import React, { useState, useEffect } from "react";
import { CustomAppBar, CustomTypography } from "./styles";
import memories from "../../images/memories.jpg";
import { Container, Avatar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState(null);
    const location = useLocation();
    const dispatch = useDispatch();
    const logout = () => {
        dispatch({ type: "LOGOUT" });
        // redirect back to home
        navigate("/");

        setUser(null);
    };

    useEffect(() => {
        // # only after u sign in then it will stored lcoally then u have a use
        const token = user?.token;
        if (token) {
            const decodedToken = jwtDecode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    return (
        <>
            <CustomAppBar position="static" color="inherit">
                <div
                    className="header"
                    style={{
                        display: "flex",
                        alignItems: "center",

                        width: "70%",
                        justifyContent: "flex-end",
                        // marginRight: "2.5rem",
                    }}
                >
                    <CustomTypography
                        variant="h2"
                        align="center"
                        sx={{ fontSize: { xs: "1rem", md: "3rem" } }}
                    >
                        Memories
                    </CustomTypography>
                    <img
                        src={memories}
                        alt="memories"
                        height="60"
                        width="80"
                        style={{ borderRadius: "50%", marginLeft: "1rem" }}
                    />
                </div>

                <Toolbar
                    sx={{
                        width: "30%",
                    }}
                >
                    {user ? (
                        <div
                            style={{
                                display: "flex",
                                gap: "1rem",
                                alignItems: "center",
                            }}
                        >
                            <Avatar
                                alt={user.result.name}
                                src={user.result.picture}
                            >
                                {user.result.name.charAt(0)}
                            </Avatar>
                            <Typography
                                variant="h6"
                                sx={{ fontSize: { xs: "1rem" } }}
                            >
                                {user.result.name}
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => logout()}
                            >
                                Log out
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={() => navigate("/auth")}
                        >
                            Sign in
                        </Button>
                    )}
                </Toolbar>
            </CustomAppBar>
        </>
    );
};

export default Navbar;
