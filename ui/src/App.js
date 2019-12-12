import React from "react";
import { Router } from "@reach/router";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotRegistered from "./screens/NotRegistered";

import AuthContextProvider from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthContextProvider 
      render={({ user }) => {
        return user ? (
          <Router>
        	  <Home path="/" />
          </Router>
        ) : (
          <Router>
            <Login path="/login" onLogin={null} />
            <NotRegistered default />
          </Router>
        )
      }}
    />
  );
}
