import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import { Navbar, Container } from "react-bootstrap";

const Header = ({ isTheme, handleTheme }) => {
  const userLogin = JSON.parse(localStorage.getItem("userInfo"));
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/admin/login";
  };
  return (
    <div
      className={`d-flex justify-content-between align-items-center px-3 py-1 fixed-top  shadow`}
      style={{ zIndex: 2, userSelect: "none" }}
    >
      <Navbar>
        <Navbar.Brand
          href="/admin"
          className={`fs-4 ${isTheme ? "text-white" : "text-dark"}`}
        >
          <i className="bi bi-house"></i>
          <span className="ms-2">Store Book</span>
        </Navbar.Brand>
      </Navbar>

      <Nav>
        <div className="me-3" style={{ userSelect: "none" }}>
          {isTheme && isTheme === true ? (
            <div
              className="d-flex align-items-center justify-content-center bg-white text-dark fs-5 rounded-circle"
              style={{ width: "40px", height: "40px", cursor: "pointer" }}
              onClick={() => {
                handleTheme(isTheme);
              }}
            >
              <i className="bi bi-brightness-high-fill "></i>
            </div>
          ) : (
            <div
              className="d-flex align-items-center justify-content-center bg-dark text-white fs-5 rounded-circle"
              style={{ width: "40px", height: "40px", cursor: "pointer" }}
              onClick={() => {
                handleTheme(isTheme);
              }}
            >
              <i className="bi bi-moon-stars-fill"></i>
            </div>
          )}
        </div>
        <Dropdown>
          <Dropdown.Toggle
            as="div"
            bsPrefix="custom-toggle"
            className="d-flex align-items-center"
            style={{ cursor: "pointer", minWidth: "120px" }}
          >
            <div className="d-flex align-items-center">
              <div style={{ width: "40px", height: "40px" }}>
                <Image
                  src={`http://localhost:8080/avatar/${userLogin.avatar}`}
                  roundedCircle
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <span className="ms-2">{userLogin.fullname}</span>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => console.log("Trang cá nhân")}>
              <i className="bi bi-person-fill me-2"></i>Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log("Cài đặt")}>
              <i className="bi bi-gear-fill me-2"></i>Setting
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => handleLogout()}
              className="text-danger"
            >
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </div>
  );
};

export default Header;
