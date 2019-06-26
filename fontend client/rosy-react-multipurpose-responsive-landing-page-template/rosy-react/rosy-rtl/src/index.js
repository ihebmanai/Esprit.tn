import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

ReactDOM.render(
    <BrowserRouter basename={"/tf-jsx-demo/rosy-rtl/"}>
        <Route path="/" component={App} />
    </BrowserRouter>,
    document.getElementById("root")
);