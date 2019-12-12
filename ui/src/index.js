import React from "react";
import { render } from "react-dom";
import App from "./App.js";
import ThemeContextProvider from "./contexts/ThemeContext";

render((
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>
), document.getElementById("root"));