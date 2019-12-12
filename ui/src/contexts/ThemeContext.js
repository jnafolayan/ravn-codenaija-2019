import React, { useReducer } from "react";

export const ThemeContext = React.createContext();

const themes = {
  dark: {
    bg: 'rgb(13 , 13, 13)',
    text: 'rgb(238, 238, 238)'
  },
  light: {
    bg: 'rgb(250, 250, 250)',
    text: 'rgb(10, 10, 10)'
  }
};

const themeReducer = ({ state, action }) => {
  switch (action.type) {
    case "TOGGLE":
      const newTheme = state == theme.dark ? theme.light : theme.dark;
      localStorage.setItem("theme", newTheme);
      return newTheme;
    default:
      return state;
  }
}

export default function ThemeContextProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, themes.dark);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
}