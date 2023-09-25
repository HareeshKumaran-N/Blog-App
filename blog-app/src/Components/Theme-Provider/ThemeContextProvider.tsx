"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

export const ThemeContext = createContext({});

const ThemeContextProvider = ({ children }: any) => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (typeof window.localStorage) {
      if (localStorage.getItem("Theme")) {
        setTheme(localStorage.getItem("Theme"));
      } else {
        setTheme("dark");
        localStorage.setItem("Theme", "dark");
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
