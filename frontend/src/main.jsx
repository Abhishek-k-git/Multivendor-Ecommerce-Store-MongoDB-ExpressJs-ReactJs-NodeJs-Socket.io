import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import Store from "./redux/store.js";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);
