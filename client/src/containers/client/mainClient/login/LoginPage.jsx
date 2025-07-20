import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Breadcrumb from "../../../../components/breadcrumb/Breadcrumb";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import ButtonCustom from "../../../../components/button/ButtonCustom";
import { InputGroup, Button } from "react-bootstrap";
import logoGG from "../../../../assets/image/google.png";
import logoFB from "../../../../assets/image/facebook.png";
import bookstoreImg from "../../../../assets/image/bookstore.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  resetLoginUserState,
  getUserWithAddress,
  googleLogin,
  facebookLogin,
} from "../../../../redux/slices/userSlice";
import Spinner from "react-bootstrap/Spinner";
import { GoogleLogin } from "@react-oauth/google";
// import FacebookLogin from "react-facebook-login";

const breadcrumbItems = [
  { label: "Trang chủ", link: "/" },
  { label: "Đăng nhập" },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, error, isLoggedIn } = useSelector(
    (state) => state.user.auth
  );

  const {
    user,
    accessToken,
    loading,
    error: errorLoginGoogle,
  } = useSelector((state) => state.user.userLoginGoogle);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = () => {
    if (!validateForm()) return;

    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserWithAddress());
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {}, [navigate]);

  const handleinputEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Vui lòng nhập Email",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }
  };

  const handleinputPassword = (e) => {
    dispatch(resetLoginUserState());

    setPassword(e.target.value);
    if (e.target.value === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Vui lòng nhập mật khẩu",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    }
  };

  const responseFacebook = (response) => {
    console.log("Facebook response:", response);

    if (response.accessToken) {
      dispatch(facebookLogin(response.accessToken));
    } else {
      console.error("Facebook login failed:", response);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Vui lòng nhập Email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
            height: "480px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            backgroundColor: "#F8F9FA",
          }}
        >
          <div
            style={{
              flex: 1,
              maxWidth: "50%",
              padding: "0 40px",
              margin: "0 auto",
            }}
          >
            <h3 className="text-center">Đăng nhập</h3>
            <Form noValidate>
              <Form.Group className="mb-1" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: "#E9ECEF" }}>
                    <i className="bi bi-envelope-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={handleinputEmail}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ minHeight: "20px", display: "block" }}
                  >
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-1" controlId="formPassword">
                <Form.Label>Mật khẩu</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: "#E9ECEF" }}>
                    <i className="bi bi-lock-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={handleinputPassword}
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
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: "block", minHeight: "25px" }}
                  >
                    {error === null ? errors.password : error}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" id="formGridCheckbox">
                <div className="d-flex justify-content-end align-items-center">
                  <Link to="/quen-mat-khau" style={{ fontSize: "0.9rem" }}>
                    Quên mật khẩu?
                  </Link>
                </div>
              </Form.Group>
            </Form>

            <div className="d-flex justify-content-center align-items-center">
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
                      <span>Đăng nhập</span>
                    </>
                  ) : (
                    "Đăng nhập"
                  )
                }
                icon={!isLoading && "bi bi-box-arrow-in-right fs-5 me-2"}
                onClick={handleLogin}
                disabled={isLoading}
              />
            </div>

            <div className="d-flex align-items-center my-3">
              <div className="flex-grow-1">
                <hr />
              </div>
              <div className="px-3 text-muted" style={{ whiteSpace: "nowrap" }}>
                hoặc đăng nhập bằng
              </div>
              <div className="flex-grow-1">
                <hr />
              </div>
            </div>

            <div className="d-flex justify-content-center gap-3">
              {/* <Button
                className=" d-flex align-items-center"
                style={{
                  border: "1px solid black",
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                <div className="d-flex align-items-center justify-content-center me-2">
                  <img src={logoGG} width="24" height="24" alt="gg" />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span>Đăng nhập Google</span>
                </div>
              </Button> */}
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const token = credentialResponse.credential;
                  dispatch(googleLogin(token));
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
              {/* <Button
                className=" d-flex align-items-center"
                style={{
                  border: "none",
                  backgroundColor: "#3b5998",
                  color: "white",
                }}
              >
                <div className="d-flex align-items-center justify-content-center me-2">
                  <img src={logoFB} width="24" height="24" alt="fb" />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span>Đăng nhập Facebook</span>
                </div>
              </Button> */}
              {/* <FacebookLogin
                appId="1794199801481411"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                icon="fa-facebook"
                textButton="&nbsp;Đăng nhập Facebook"
                cssClass="btn btn-primary"
              /> */}
            </div>
          </div>

          <div
            style={{
              flex: 1,
              maxWidth: "50%",
              height: "100%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <img src={bookstoreImg} className="h-100" alt="bookstore" />
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
              }}
            >
              <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>
                Chào mừng bạn đến với Booklovers!
              </h2>
              <p style={{ fontSize: "1.1rem", marginBottom: "30px" }}>
                Khám phá thế giới tri thức, kết nối với hàng ngàn đầu sách hấp
                dẫn ngay hôm nay.
              </p>
              <Link to="/dang-ky">
                <Button
                  variant="light"
                  style={{
                    fontWeight: "bold",
                    color: "#E14654",
                    border: "2px solid white",
                    padding: "10px 20px",
                  }}
                >
                  Tạo tài khoản mới
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
