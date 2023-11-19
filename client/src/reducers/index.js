import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import settings from "./appSettings";

export default combineReducers({
    posts,
    auth,
    settings,
});
