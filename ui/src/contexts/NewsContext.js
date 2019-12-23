import React, { useReducer } from "react";

const initialState = {
  all: [],
  trending: [],
  nearby: []
};

const KM_IN_FEET = 0.0003048;
const NEARBY_DIST = 10000; // ft to km

const toRadians = angle => angle * Math.PI / 180;

// credits: https://www.geeksforgeeks.org/program-distance-two-points-earth/
const getDist = (a, b) => {
  const lat1 = toRadians(a[1]); 
  const long1 = toRadians(a[0]); 
  const lat2 = toRadians(b[1]); 
  const long2 = toRadians(b[0]); 
    
  // Haversine Formula 
  const dlong = long2 - long1; 
  const dlat = lat2 - lat1; 

  let ans = Math.pow(Math.sin(dlat / 2), 2) 
          + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlong / 2), 2); 
  ans = 2 * Math.atan2(Math.sqrt(ans), Math.sqrt(1-ans)); 

  // Radius of Earth in  
  // Kilometers, R = 6371 
  // Use R = 3956 for miles 
  const R = 6371;

  // Calculate the result 
  return ans * R / KM_IN_FEET | 0; 
};

const isNearby = (report, user) => {
  return getDist(report.location, user.location) <= NEARBY_DIST;
};

const syncDistance = (report, user) => {
  report.feetAway = getDist(report.location, user.location);
};

const sync = (state, user) => {
  state.all
    .forEach(report => syncDistance(report, user));

  state.trending = state.all.slice()
    .sort((a, b) => b.views - a.views);

  state.nearby = state.all.slice()
    .filter((report) => isNearby(report, user))
    .sort((a, b) => a.feetAway - b.feetAway);
};

export const NewsContext = React.createContext();

const newsReducer = (state, action) => {
  const { type, payload } = action;
  let all, trending, nearby;

  switch (type) {
    case "PUSH":
      state.all = state.all.concat([payload.report]);
      if (!state.trending.length)
        sync(state, payload.user);
      return state;
    case "LOAD":
      state.all = payload.reports.slice();
      if (!state.trending.length)
        sync(state, payload.user);
      return state;
    case "SYNC":
      sync(state, payload.user);
      return state;
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