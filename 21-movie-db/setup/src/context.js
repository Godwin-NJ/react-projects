import React, { useState, useContext, useEffect } from "react";
// make sure to use https
import useFetch from "./useFetch";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [query, setQuery] = useState("wolverine");

  const { loading, data: movies, error } = useFetch(`&s=${query}`);

  return (
    <AppContext.Provider value={{ loading, movies, error, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
