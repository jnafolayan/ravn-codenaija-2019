import React from "react";
import { render } from "react-dom";
import App from "./App.js";
import ThemeContextProvider from "./contexts/ThemeContext";

import "./assets/fonts/font-awesome/css/all.min.css";

render((
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>
), document.getElementById("root"));