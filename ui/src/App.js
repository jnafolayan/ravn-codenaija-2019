import React, { useContext, useEffect, useState } from "react";
import { Location, Router, navigate } from "@reach/router";
import posed, { PoseGroup } from "react-pose";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import MobileMode from "./screens/MobileMode";
import WriteReport from "./screens/WriteReport";
import NotFound from "./screens/NotFound";

import AuthContextProvider, { AuthContext } from "./contexts/AuthContext";

const RouteContainer = posed.div({
  enter: { delay: 300, opacity: 1, beforeChildren: false, staggerChildren: 50  },
  exit: { opacity: 0, staggerChildren: 20 }
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
  const [startGeoPoll, setStartGeoPoll] = useState(true);

  useEffect(() => {
    if (!startGeoPoll) return;
    setStartGeoPoll(false);

    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        localStorage.setItem("coords", coords.reverse());
      });
    }, 10000);

    return () => {
      clearInterval(interval);
    }
  }, [startGeoPoll]);

  return (
    <AuthContextProvider>
      <PosedRouter>
        <Protected path="/" render={() => <Home />} />
        <Protected path="/mobile" render={() => <MobileMode />} />
        <Protected path="/write" render={() => <WriteReport />} />
        <Login path="/login" />
        <Signup path="/signup" />
        <NotFound default />
      </PosedRouter>
    </AuthContextProvider>
  );
}
