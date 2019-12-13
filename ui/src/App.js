import React, { useContext } from "react";
import { Router, navigate } from "@reach/router";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";

import AuthContextProvider, { AuthContext } from "./contexts/AuthContext";

const Protected = ({ render }) => {
  const { state } = useContext(AuthContext);
  if (state.user)
    return render();
  else {
    navigate("/login");
    return null;
  }
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
