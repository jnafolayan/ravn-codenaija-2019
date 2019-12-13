import React from "react";

const initialState = {
  nearby: [],
  trending: [],
  all: []
};

export const NewsContext = React.createContext();

const newsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "PUSH":
      const all = state.all.concat([payload]);
      const trending = syncTrending(all);
      const nearby = state.nearby;

      if (isNearby(payload))
        nearby.push(payload);

      return { ...state, nearby, trending };
    case "FETCH":
      const all = payload.slice();
      const trending = syncTrending(all);
      const nearby = all.filter(isNearby);
      return { all, trending, nearby };
    default:
      return state;
  }
};

export default function NewsContextProvider({ children }) {
  const [state, dispatch] = useReducer(newsReducer, initialState);

  return (
    <NewsContext.Provider value={{ state, dispatch }}>
      {children}
    </NewsContext.Provider>
  );
}