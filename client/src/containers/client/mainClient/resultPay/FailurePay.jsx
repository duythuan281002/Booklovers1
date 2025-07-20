import React from "react";
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import failure from "../../../../assets/image/failure.png";

const FailurePay = () => {
  return (
    <Container className="py-5 text-center">
      <Card className="border-0" style={{ padding: "80px" }}>
        <Card.Body>
          <Image src={failure} alt="Failed" width={100} className="mb-4" />
          <h2 className="text-danger mb-3">Thanh toán thất bại!</h2>
          <p className="text-muted mb-4">
            Rất tiếc, đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại
            hoặc liên hệ với chúng tôi để được hỗ trợ.
          </p>
          <Link to="/">
            <Button variant="outline-secondary me-2" className="">
              Trang chủ
            </Button>
          </Link>
          <Link to="/gio-hang">
            <Button
              style={{ backgroundColor: "#E35765", borderColor: "#E35765" }}
            >
              Quay lại giỏ hàng
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FailurePay;
