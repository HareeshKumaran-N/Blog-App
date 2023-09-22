"use client";
import { useContext } from "react";
import { ThemeContext } from "@/Components/Theme-Provider/ThemeContextProvider";

import "./ThemeButton.scss";

import Image from "next/image";
const ThemeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const LocalStorageSetter = (value: string) => {
    localStorage.setItem("Theme", value);
  };

  const toggler = () => {
    if (typeof window.localStorage) {
      if (theme === "light") {
        setTheme("dark");
        LocalStorageSetter("dark");
      }

      if (theme === "dark") {
        setTheme("light");
        LocalStorageSetter("light");
      }
    }
  };

  return (
    <>
      <div className="wrapper">
        <div
          className="switcher"
          style={theme === "light" ? { right: "0px" } : { left: "0px" }}
          onClick={toggler}
        />
        <Image src="/moon.png" alt="moon" width={30} height={30} />
        <Image src="/sun.png" alt="moon" width={30} height={30} />
      </div>
    </>
  );
};

export default ThemeButton;
