import { useMediaQuery } from "@mui/material";
import { TOGGLE, INITIALISED_SYSTEM_MODE } from "../constants/actionTypes";

const appSettingsReducer = (state = { mode: "light" }, action) => {
    switch (action.type) {
        case TOGGLE:
            return {
                ...state,
                mode: state.mode === "light" ? "dark" : "light",
            };
        case INITIALISED_SYSTEM_MODE:
            return {
                ...state,
                mode: action.defaultMode,
            };

        default:
            return state;
    }
};

export default appSettingsReducer;
