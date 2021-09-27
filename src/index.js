import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ReactFCCtest from "react-fcctest";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <div align="center">
      <p>Built by Jonathan Hodge</p>
    </div>
    <ReactFCCtest />
  </React.StrictMode>,
  document.getElementById("root")
);
