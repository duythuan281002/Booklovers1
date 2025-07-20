import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Breadcrumb from "../../../../components/breadcrumb/Breadcrumb";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AccountPage = () => {
  const location = useLocation();

  // Lấy đoạn path sau /tai-khoan
  const path = location.pathname.split("/").pop();

  const breadcrumbMap = {
    "ho-so": "Hồ sơ",
    "dia-chi": "Địa chỉ",
    "don-hang": "Đơn hàng",
  };

  const breadcrumbItems = [
    { label: "Trang chủ", link: "/" },
    { label: breadcrumbMap[path] || "Hồ sơ" },
  ];
  return (
    <>
      <Container className="">
        <Breadcrumb items={breadcrumbItems} />
        <Row className="mb-4">
          <Sidebar />
          <Col md={9} style={{ minHeight: "500px" }}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AccountPage;
