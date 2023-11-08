import React from "react";
import ReactDOM from "react-dom";

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
    <Provider store={store}>
        <App />
    </Provider>
);
