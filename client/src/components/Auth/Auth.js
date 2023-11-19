import {
    Avatar,
    Container,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
} from "@mui/material";
import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import Input from "./Input";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../actions/auth";
import { toast } from "react-toastify";

const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("profile"));

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            //sign the user up
            dispatch(signUp(formData, navigate));
        } else {
            // log the user in
            dispatch(signIn(formData, navigate));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const switchMode = () => {
        setIsSignUp(!isSignUp);
    };

    const createOrGetUser = (response) => {
        // the credential itself is the JWT token is OAUTH2!!!!
        const result = jwtDecode(response.credential);

        const token = response.credential;

        try {
            dispatch({ type: "AUTH", data: { result, token } });
            // redirect back to home
            toast.success("Logged in successfully");
            navigate("/");
        } catch (error) {
            toast.error("Logged in failed");
            console.log(error);
        }
    };

    const onSuccess = (response) => {
        createOrGetUser(response);
    };
    const onError = (error) => {
        console.log(error);
    };

    if (user) {
        return <Navigate to="/posts" />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper
                elevation={3}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "1rem",
                    alignItems: "center",
                    borderRadius: "1rem",
                }}
            >
                <Avatar>
                    <LockIcon />
                </Avatar>

                <Typography variant="h5">
                    {isSignUp ? "Sign up" : "Sign in "}
                </Typography>
                <form style={{ marginTop: "1rem" }} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input
                                    name="firstName"
                                    label="First Name"
                                    handleChange={handleChange}
                                    autofocus
                                    half
                                />
                                <Input
                                    name="lastName"
                                    label="Last Name"
                                    handleChange={handleChange}
                                    half
                                />
                            </>
                        )}
                        <Input
                            name="email"
                            label="Email Address"
                            handleChange={handleChange}
                            type="email"
                        />
                        <Input
                            name="password"
                            label="Password"
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignUp && (
                            <Input
                                name="confirmPassword"
                                label="Confirm Password"
                                handleChange={handleChange}
                                type={"password"}
                            />
                        )}
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ marginTop: "1rem" }}
                            >
                                {isSignUp ? "Sign up" : "Sign in"}
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <GoogleLogin
                                onSuccess={onSuccess}
                                onError={onError}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid container justifyContent="flex-end" pt={"1rem"}>
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignUp
                                        ? "Already have an account? Sign in"
                                        : "Don't have an account? Sign up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
