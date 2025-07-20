import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import Main from "./main/Main";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./main/header/Header";
import { toggleTheme } from "../../redux/slices/themeSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const isTheme = useSelector((state) => state.theme.isTheme);

  const backgroundColor = isTheme ? "#112143" : "#ffffff";
  const textColor = isTheme ? "#ffffff" : "#000000";

  const handleTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <div
      style={{
        backgroundColor,
        color: textColor,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header isTheme={isTheme} handleTheme={handleTheme} />
      <div
        className="row g-0 "
        style={{ userSelect: "none", marginTop: "70px" }}
      >
        <div className="col-2">
          <Sidebar />
        </div>
        <div>
          <Main>
            <Outlet />
          </Main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
