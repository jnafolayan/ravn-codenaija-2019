import React, { useReducer } from "react";

export const AuthContext = React.createContext();

const extract = key => localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;

const initialState = {
  user: extract("user"),
  token: extract("token")
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const { user, token } = action.payload;
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("coords", [0,0]);
      return { ...state, user, token, coords: [0,0] };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        user: null,
        token: null
      };
    case "GEO_CHANGE":
      localStorage.setItem("coords", action.payload);
      return { ...state, coords: action.payload }
    default:
      return state;
  }
}

export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}