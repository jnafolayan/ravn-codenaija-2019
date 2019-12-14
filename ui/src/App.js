import React, { useContext } from "react";
import { Router, navigate } from "@reach/router";
import posed, { PoseGroup } from "react-pose";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import MobileMode from "./screens/MobileMode";
import NotFound from "./screens/NotFound";

import AuthContextProvider, { AuthContext } from "./contexts/AuthContext";

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: 300 },
  exit: { opacity: 0 }
});

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <PoseGroup>
        <RouteContainer key={location.key}>
          <Router location={location}>{children}</Router>
        </RouteContainer>
      </PoseGroup>
    )}
  </Location>
);

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
      <PosedRouter>
        <Protected path="/" render={() => <Home />} />
        <Protected path="/mobile" render={() => <MobileMode />} />
        <Login path="/login" />
        <Signup path="/signup" />
        <NotFound default />
      </PosedRouter>
    </AuthContextProvider>
  );
}
