import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Breadcrumb from "../../../../components/breadcrumb/Breadcrumb";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import ButtonCustom from "../../../../components/button/ButtonCustom";
import { InputGroup, Button, Spinner } from "react-bootstrap";
import bookstoreImg from "../../../../assets/image/bookstore.jpg";
import { createNewUser } from "../../../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const breadcrumbItems = [
  { label: "Trang chủ", link: "/" },
  { label: "Đăng ký" },
];

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordXn, setShowPasswordXn] = useState(false);

  const { isLoading } = useSelector((state) => state.user.createUser);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error khi nhập
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.fullname.trim()) newErrors.fullname = "Vui lòng nhập Họ và tên";
    if (!form.email.trim()) {
      newErrors.email = "Vui lòng nhập Email";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!form.password) {
      newErrors.password = "Vui lòng nhập Mật khẩu";
    } else if (form.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!form.confirmPassword)
      newErrors.confirmPassword = "Vui lòng nhập lại Mật khẩu";
    else if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = "Mật khẩu không khớp";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("fullname", form.fullname);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("role", "user");
    formData.append("avatar", "default.jpg");

    dispatch(createNewUser(formData)).then((res) => {
      if (!res.error) {
        navigate("/dang-nhap");
      }
    });
  };
  return (
    <Container>
      <Breadcrumb items={breadcrumbItems} />
      <div
        className="d-flex justify-content-center mb-4 align-items-center bg-white"
        style={{ padding: "60px 0" }}
      >
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            width: "80%",
            height: "520px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            backgroundColor: "#F8F9FA",
          }}
        >
          <div
            style={{
              flex: 1,
              maxWidth: "50%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img src={bookstoreImg} alt="bookstore" className="h-100" />
            <div
              style={{
                position: "absolute",
                backgroundColor: "rgba(0,0,0,0.7)",
                top: "0",
                right: "0",
                left: "0",
                bottom: "0",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: "0 30px",
              }}
            >
              <h2 style={{ fontWeight: "bold", marginBottom: "40px" }}>
                Gia nhập cộng đồng Booklovers!
              </h2>
              <p style={{ fontSize: "1.1rem", marginBottom: "40px" }}>
                Cùng hàng ngàn người yêu sách khám phá kho tàng tri thức phong
                phú và đa dạng.
              </p>
              <span style={{ fontSize: "0.95rem" }}>
                Bạn đã có tài khoản?
                <Link
                  to="/dang-nhap"
                  style={{
                    color: "#ffc107",
                    marginLeft: "5px",
                    textDecoration: "underline",
                  }}
                >
                  Đăng nhập ngay
                </Link>
              </span>
            </div>
          </div>
          <div
            style={{
              flex: 1,
              maxWidth: "50%",
              padding: "0 40px",
              margin: "0 auto",
            }}
          >
            <h3 className="text-center mt-3">Đăng ký tài khoản</h3>
            <Form>
              <Form.Group className="mb-1" controlId="formName">
                <Form.Label>Họ và tên</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: "#E9ECEF" }}>
                    <i className="bi bi-person-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="fullname"
                    value={form.fullname}
                    onChange={handleChange}
                    placeholder="Họ và tên"
                    isInvalid={!!errors.fullname}
                  />
                </InputGroup>
                <Form.Control.Feedback
                  type="invalid"
                  style={{ minHeight: "20px", display: "block" }}
                >
                  {errors.fullname}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-1" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: "#E9ECEF" }}>
                    <i className="bi bi-envelope-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    isInvalid={!!errors.email}
                  />
                </InputGroup>
                <Form.Control.Feedback
                  type="invalid"
                  style={{ minHeight: "20px", display: "block" }}
                >
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-1" controlId="formPassword">
                <Form.Label>Mật khẩu</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: "#E9ECEF" }}>
                    <i className="bi bi-lock-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Mật khẩu"
                    isInvalid={!!errors.password}
                  />
                  <Button
                    onMouseDown={() => setShowPassword(true)}
                    onMouseUp={() => setShowPassword(false)}
                    onMouseLeave={() => setShowPassword(false)}
                    tabIndex={-1}
                    style={{ backgroundColor: "#E9ECEF", border: "none" }}
                  >
                    <i
                      className={`bi text-black ${
                        showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                      }`}
                    ></i>
                  </Button>
                </InputGroup>
                <Form.Control.Feedback
                  type="invalid"
                  style={{ minHeight: "20px", display: "block" }}
                >
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-1" controlId="formConfirmPassword">
                <Form.Label>Xác nhận mật khẩu</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: "#E9ECEF" }}>
                    <i className="bi bi-lock-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type={showPasswordXn ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Nhập lại mật khẩu"
                    isInvalid={!!errors.confirmPassword}
                  />
                  <Button
                    onMouseDown={() => setShowPasswordXn(true)}
                    onMouseUp={() => setShowPasswordXn(false)}
                    onMouseLeave={() => setShowPasswordXn(false)}
                    tabIndex={-1}
                    style={{ backgroundColor: "#E9ECEF", border: "none" }}
                  >
                    <i
                      className={`bi text-black ${
                        showPasswordXn ? "bi-eye-slash-fill" : "bi-eye-fill"
                      }`}
                    ></i>
                  </Button>
                </InputGroup>
                <Form.Control.Feedback
                  type="invalid"
                  style={{ minHeight: "20px", display: "block" }}
                >
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>

            <div className="d-flex justify-content-center align-items-center mb-3">
              <ButtonCustom
                bgrColor="#E14654"
                text={
                  isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      <span>Đang tạo</span>
                    </>
                  ) : (
                    "Đăng ký"
                  )
                }
                icon={!isLoading && "bi bi-person-plus-fill fs-5 me-2"}
                onClick={handleRegister}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
