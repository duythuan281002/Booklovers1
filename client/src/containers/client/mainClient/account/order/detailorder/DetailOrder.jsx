import React from "react";
import { Modal, Button, Table, Image, Row, Col, Badge } from "react-bootstrap";

const DetailOrderModal = ({ show, handleClose, order }) => {
  if (!order) return null;

  const statusMap = {
    pending: { text: "Đang chờ xử lý", variant: "warning" },
    confirmed: { text: "Đã xác nhận", variant: "info" },
    shipping: { text: "Đang giao hàng", variant: "primary" },
    delivered: { text: "Đã giao hàng", variant: "success" },
    cancelled: { text: "Đã huỷ", variant: "danger" },
    returned: { text: "Đã trả hàng", variant: "secondary" },
  };

  const paymentMap = {
    cod: { text: "Thanh toán khi nhận hàng", variant: "secondary" },
    bank: { text: "Chuyển khoản ngân hàng", variant: "info" },
    momo: { text: "Ví MoMo", variant: "warning" },
    vnpay: { text: "Thanh toán VNPAY", variant: "success" },
  };

  const paymentStatusMap = {
    unpaid: { text: "Chưa thanh toán", variant: "secondary" },
    paid: { text: "Đã thanh toán", variant: "success" },
    failed: { text: "Thanh toán thất bại", variant: "danger" },
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Đơn hàng <strong>{order.order_code}</strong>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-3">
        <Row>
          <Col md={6}>
            <p>
              <strong>Khách hàng:</strong> {order.fullname}
            </p>
            <p>
              <strong>SĐT:</strong> {order.phone}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {order.location}
            </p>
          </Col>
          <Col md={6}>
            <p>
              <strong>Ngày đặt:</strong>{" "}
              {new Date(order.order_date).toLocaleString()}
            </p>
            <p className="d-flex align-items-center">
              <strong className="me-2">Thanh toán:</strong>
              <Badge
                className="me-2"
                bg={paymentMap[order.payment_method]?.variant || "light"}
              >
                {paymentMap[order.payment_method]?.text || order.payment_method}
              </Badge>

              {order.payment_method !== "cod" && (
                <Badge
                  bg={
                    paymentStatusMap[order.payment_status]?.variant || "light"
                  }
                >
                  {paymentStatusMap[order.payment_status]?.text ||
                    order.payment_status}
                </Badge>
              )}
            </p>

            <p className="d-flex align-items-center">
              <strong className="me-2">Trạng thái:</strong>{" "}
              <Badge bg={statusMap[order.status]?.variant || "light"}>
                {statusMap[order.status]?.text || order.status}
              </Badge>
            </p>
          </Col>
        </Row>

        <h5 className="mb-2">Sản phẩm</h5>
        <Table responsive bordered hover>
          <thead className="table-light">
            <tr>
              <th className="text-center">Ảnh</th>
              <th>Tên sách</th>
              <th className="text-center">Số lượng</th>
              <th className="text-center">Đơn giá</th>
              <th className="text-center">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.order_item_id} className="align-middle text-center">
                <td>
                  <Image
                    src={`http://localhost:8080/uploads/${item.book_image}`}
                    alt={item.book_name}
                    width={50}
                    height={70}
                    rounded
                  />
                </td>

                <td className="align-middle text-start">{item.book_name}</td>

                <td>{item.quantity}</td>
                <td>{parseInt(item.unit_price).toLocaleString("vi-VN")}₫</td>
                <td>
                  {(item.quantity * parseInt(item.unit_price)).toLocaleString(
                    "vi-VN"
                  )}
                  ₫
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <hr style={{ margin: "0 0 16px" }} />
        <Row className="mt-2 d-flex align-items-center">
          <Col md={6}>
            {order.promotion && (
              <div className="alert alert-info mb-0">
                <strong>Khuyến mãi:</strong> {order.promotion.description}{" "}
                <Badge bg="secondary">{order.promotion.code}</Badge>
              </div>
            )}
          </Col>
          <Col md={6} className="d-flex flex-column align-items-end">
            <div className="mb-1" style={{ fontSize: "18px" }}>
              <span className="fw-semibold">Phí ship:</span>{" "}
              {parseInt(order.shipping_fee).toLocaleString("vi-VN")}₫
            </div>
            <div style={{ color: "#E35765", fontSize: "18px" }}>
              <span className="fw-semibold text-black">Tổng tiền:</span>{" "}
              {parseInt(order.total_price).toLocaleString("vi-VN")}₫
            </div>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between align-items-start flex-wrap">
        {order.note && (
          <div style={{ maxWidth: "75%", wordBreak: "break-word" }}>
            Ghi chú: {order.note}
          </div>
        )}
        <div></div>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailOrderModal;
