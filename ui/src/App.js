import React, { useContext } from "react";
import { Router } from "@reach/router";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";

import AuthContextProvider, { AuthContext } from "./contexts/AuthContext";

const Protected = ({ render }) => {
  const { state } = useContext(AuthContext);
  return state.user ? render() : <Login />;
};

export default function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Protected path="/" render={() => <Home />} />
        <Login path="/login" />
        <NotFound default />
      </Router>
    </AuthContextProvider>
  );
}
