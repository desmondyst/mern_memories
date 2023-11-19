import { Box, IconButton, Tooltip, useMediaQuery } from "@mui/material";
import React from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@emotion/react";
import { TOGGLE } from "../../constants/actionTypes";
import { useDispatch } from "react-redux";

const LightModeToggle = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const toggleMode = () => {
        dispatch({
            type: TOGGLE,
            mode: theme.palette.mode,
        });
    };
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
                {theme.palette.mode === "dark" ? (
                    <Tooltip title="Switch to light mode">
                        <Brightness7Icon />
                    </Tooltip>
                ) : (
                    <Tooltip title="Switch to dark mode">
                        <Brightness4Icon />
                    </Tooltip>
                )}
            </IconButton>
        </Box>
    );
};

export default LightModeToggle;
