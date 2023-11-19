import React from "react";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import "./index.css";

import App from "./App";

import reducers from "./reducers";
import { createRoot } from "react-dom/client";

const store = configureStore({ reducer: reducers });

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
        <Provider store={store}>
            <App />
        </Provider>
    </GoogleOAuthProvider>
);
