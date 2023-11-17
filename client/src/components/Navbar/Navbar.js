import React, { useState, useEffect } from "react";
import { CustomAppBar, CustomTypography } from "./styles";
import memories from "../../images/memories.jpg";
import { Container, Avatar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const Navbar = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState(null);
    const location = useLocation();
    const dispatch = useDispatch();

    const logout = () => {
        try {
            dispatch({ type: "LOGOUT" });
            toast.success("Logged out successfully");
            // redirect back to home
            navigate("/");

            setUser(null);
        } catch (error) {
            toast.error("Logged out failed");
        }
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
            <CustomAppBar
                position="static"
                color="inherit"
                sx={{ paddingY: "0.3rem" }}
            >
                <Container
                    className="header"
                    sx={{
                        display: "flex",

                        alignItems: "center",
                        marginLeft: { xs: "0.5rem", sm: "2.5rem" },
                    }}
                >
                    <CustomTypography
                        variant="h2"
                        fontWeight={500}
                        align="center"
                        sx={{ fontSize: { xs: "1rem", md: "3rem" } }}
                    >
                        Memories
                    </CustomTypography>
                    {/* <img
                        src={memories}
                        alt="memories"
                        height="60"
                        width="80"
                        style={{ borderRadius: "50%", marginLeft: "1rem" }}
                    /> */}
                </Container>

                <div>
                    {user ? (
                        <Container
                            sx={{
                                display: "flex",
                                gap: { xs: "0.5rem", sm: "2rem" },
                                alignItems: "center",
                            }}
                        >
                            <Avatar
                                alt={user.result.name}
                                src={user.result.picture}
                                sx={{ display: { xs: "none", sm: "block" } }}
                            >
                                {user.result.name.charAt(0)}
                            </Avatar>
                            <Typography
                                variant="h6"
                                sx={{ fontSize: { xs: "1rem" } }}
                                whiteSpace="nowrap"
                            >
                                {user.result.name}
                            </Typography>
                            <Button
                                sx={{
                                    fontSize: { xs: "1rem" },
                                    whiteSpace: "nowrap",
                                }}
                                variant="contained"
                                color="secondary"
                                onClick={() => logout()}
                            >
                                <Typography fontSize={"0.8rem"}>
                                    Log out
                                </Typography>
                                {/* Log out */}
                            </Button>
                        </Container>
                    ) : location.pathname !== "/auth" ? (
                        <Button
                            variant="contained"
                            onClick={() => navigate("/auth")}
                            sx={{ whiteSpace: "nowrap", marginRight: "1.5rem" }}
                        >
                            Sign in
                        </Button>
                    ) : (
                        <></>
                    )}
                </div>
            </CustomAppBar>
        </>
    );
};

export default Navbar;
