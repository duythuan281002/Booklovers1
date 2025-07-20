import React from "react";
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import ordersuccess from "../../../../assets/image/ordersuccess.png";

const OrderSuccess = () => {
  return (
    <Container className="py-5 text-center">
      <Card className="border-0" style={{ padding: "80px" }}>
        <Card.Body>
          <Image
            src={ordersuccess}
            alt="Success"
            width={100}
            className="mb-4"
          />
          <h2 className="text-success mb-3">Đặt hàng thành công!</h2>
          <p className="text-muted mb-4">
            Cảm ơn bạn đã mua hàng tại{" "}
            <strong style={{ color: "#E35765" }}>BookLover</strong> . Đơn hàng
            của bạn đang được xử lý và sẽ sớm được giao đến bạn.
          </p>
          <Link to="/">
            <Button variant="outline-secondary me-2">Tiếp tục mua sắm</Button>
          </Link>{" "}
          <Link to="/tai-khoan/don-hang">
            <Button
              style={{ backgroundColor: "#E35765", borderColor: "#E35765" }}
              className=""
            >
              Xem đơn hàng
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderSuccess;
