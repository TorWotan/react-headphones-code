import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./_reset.scss";
import "./index.scss";
import "macro-css";
import { BrowserRouter } from "react-router-dom";



ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
