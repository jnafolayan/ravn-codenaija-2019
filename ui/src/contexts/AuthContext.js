import React, { useReducer } from "react";

export const AuthContext = React.createContext();

const initialState = {
  user: null,
  token: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const { user, token } = action.payload;
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      return { ...state, user, token };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
        token: null
      };
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