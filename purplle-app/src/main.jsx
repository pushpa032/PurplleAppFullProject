import React from "react";
import { Routes, Route } from "react-router-dom"; 
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";   
import App from "./App";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ContextProvider from "./features/ContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ContextProvider>
    <App />
  </ContextProvider>
  </BrowserRouter>
);