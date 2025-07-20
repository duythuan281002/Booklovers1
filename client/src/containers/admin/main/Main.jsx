import React from "react";
import { useSelector } from "react-redux";
import "./Main.scss";
import "./Table.scss";

const Main = ({ children }) => {
  const isTheme = useSelector((state) => state.theme.isTheme);

  return (
    <div
      className={`main-container py-2 px-3 ${
        isTheme ? "theme-dark" : "theme-light"
      }`}
    >
      {children}
    </div>
  );
};

export default Main;
