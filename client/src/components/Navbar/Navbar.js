import React, { useState, useEffect } from "react";
import { CustomAppBar, CustomTypography } from "./styles";
import memories from "../../images/memories.jpg";
import { Avatar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

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
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    return (
        <>
            <CustomAppBar position="static" color="inherit">
                <CustomTypography variant="h2" align="center">
                    Memories
                </CustomTypography>
                <img
                    src={memories}
                    alt="memories"
                    height="60"
                    width="80"
                    style={{ borderRadius: "50%", marginLeft: "1rem" }}
                />

                <Toolbar>
                    {user ? (
                        <div>
                            <Avatar
                                alt={user.result.name}
                                src={user.result.picture}
                            >
                                {user.result.name.charAt(0)}
                            </Avatar>
                            <Typography variant="h6">
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
