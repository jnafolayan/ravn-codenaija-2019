import React, { useReducer } from "react";

export const AuthContext = React.createContext();

const extract = key => localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;

if (!localStorage.cur) {
  localStorage.clear();
  localStorage.cur = "random";
}

const initialState = {
  user: extract("user"),
  token: localStorage.getItem("token") || null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const { user, token } = action.payload;
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));
      return { ...state, user, token };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        user: null,
        token: null
      };
    case "GEO_CHANGE":
      return { ...state }
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