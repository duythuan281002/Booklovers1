import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "../sidebar/Sidebar.scss";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const isTheme = useSelector((state) => state.theme.isTheme);

  return (
    <div
      className={`position-fixed top-0 start-0 p-2`}
      style={{
        height: "100vh",
        width: "240px",
        zIndex: 1,
        overflowY: "auto",
        marginTop: "70px",
      }}
    >
      <Nav className="flex-column p-1">
        <NavLink to="/admin/dashboard" className="sidebar-link mb-2">
          <i className="bi bi-speedometer2"></i>
          <span className="ms-2">Dashboard</span>
        </NavLink>
        <NavLink to="/admin/users" className="sidebar-link mb-2">
          <i className="bi bi-person-circle"></i>
          <span className="ms-2">Users</span>
        </NavLink>
        <NavLink to="/admin/products" className="sidebar-link mb-2">
          <i className="bi bi-grid"></i>
          <span className="ms-2">Products</span>
        </NavLink>
        <NavLink to="/admin/orders" className="sidebar-link mb-2">
          <i className="bi bi-cash-coin"></i>
          <span className="ms-2">Orders</span>
        </NavLink>
      </Nav>
    </div>
  );
};

export default Sidebar;
