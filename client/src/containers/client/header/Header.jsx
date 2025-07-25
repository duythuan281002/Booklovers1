import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import logoVN from "../../../assets/image/vn.png";
import logoUS from "../../../assets/image/flags.png";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import ButtonCustom from "../../../components/button/ButtonCustom";
import { Row, Col } from "react-bootstrap";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUser,
  getUserWithAddress,
} from "../../../redux/slices/userSlice";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  fetchCartFromServer,
  resetCartLogout,
} from "../../../redux/slices/cartSlice";
import { fetchCategoriesWithSub } from "../../../redux/slices/categorySlice";
import slugify from "slugify";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isProductActive = location.pathname.startsWith("/san-pham");

  const [logoViUs, setLogoViUs] = useState(logoVN);

  const { categories } = useSelector((state) => state.category);

  const { cartItems } = useSelector((state) => state.cart.cart);

  const { user } = useSelector((state) => state.user.profile);
  const { isLoggedIn } = useSelector((state) => state.user.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decodedToken.exp > now) {
          dispatch(getUserWithAddress());
        } else {
          handleLogout("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        }
      } catch (error) {
        handleLogout("Đã có lỗi khi xác thực. Vui lòng đăng nhập lại.");
      }
    }
    dispatch(fetchCartFromServer());
    dispatch(fetchCategoriesWithSub());
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCartFromServer());
      dispatch(fetchCategoriesWithSub());
    }
  }, [isLoggedIn]);

  const handleLogout = (message) => {
    dispatch(logoutUser());
    dispatch(resetCartLogout());
    if (message) toast.error(message);
    navigate("/dang-nhap");
  };

  const handleLanguageChange = (lang) => {
    if (logoViUs === lang) {
      setLogoViUs(lang);
    } else {
      setLogoViUs(lang);
    }
  };

  return (
    <div className="header-container">
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <Navbar expand="lg" className="bg-white">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <Image src="http://localhost:8080/logo/logo-1.webp" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="my-2 my-lg-0 d-flex justify-content-center"
              style={{ maxHeight: "100px", flex: "1" }}
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `p-3 nav-link ${isActive ? "nav-active" : ""}`
                }
                style={{ fontSize: "18px" }}
              >
                Trang chủ
              </NavLink>

              <div className="megamenu">
                <div
                  className={`nav-link1 ${isProductActive ? "nav-active" : ""}`}
                  onClick={() => {
                    navigate("/san-pham");
                  }}
                >
                  Sản phẩm
                </div>
                <div className="dropdown-menu megamenu-content">
                  <ul className="menu-level-1">
                    {categories.map((cat) => (
                      <li className="menu-item" key={cat.id}>
                        <NavLink
                          to={`/san-pham/danh-muc/${slugify(cat.name, {
                            lower: true,
                            locale: "vi",
                          })}`}
                          state={{ id: cat.id, name: cat.name }}
                          className="parent-title"
                        >
                          {cat.name}
                          <i className="bi bi-chevron-right"></i>
                        </NavLink>

                        <ul
                          className="menu-level-2"
                          style={{ listStyle: "none" }}
                        >
                          {cat.subcategories.map((sub) => (
                            <li key={sub.id}>
                              <NavLink
                                to={`/san-pham/danh-muc-con/${slugify(
                                  sub.name,
                                  {
                                    lower: true,
                                    locale: "vi",
                                  }
                                )}`}
                                state={{ idSub: sub.id, nameSub: sub.name }}
                                className="dropdown-item"
                              >
                                {sub.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <NavLink
                to="/bai-viet"
                className={({ isActive }) =>
                  `p-3 nav-link ${isActive ? "nav-active" : ""}`
                }
                style={{ fontSize: "18px" }}
              >
                Bài viết
              </NavLink>
              <NavLink
                to="/gioi-thieu"
                className={({ isActive }) =>
                  `p-3 nav-link ${isActive ? "nav-active" : ""}`
                }
                style={{ fontSize: "18px" }}
              >
                Giới thiệu
              </NavLink>
              <NavLink
                to="/cua-hang"
                className={({ isActive }) =>
                  `p-3 nav-link ${isActive ? "nav-active" : ""}`
                }
                style={{ fontSize: "18px" }}
              >
                Cửa hàng
              </NavLink>
            </Nav>
            <Nav
              className="d-flex align-item-center"
              style={{ userSelect: "none" }}
            >
              {/* <div
                className="d-flex align-items-center justify-content-center  fs-5 rounded-circle me-2"
                style={{ width: "40px", height: "40px", cursor: "pointer" }}
              >
                <i className="bi bi-search fs-4"></i>
              </div> */}
              <div
                className="cart d-flex align-items-center justify-content-center me-2"
                style={{
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={() => navigate("/gio-hang")}
              >
                <i className="bi bi-cart3 fs-4"></i>
                <span className="cart-num-header">{cartItems.length}</span>
              </div>
              <Dropdown className="me-2 dropdown-lang">
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="no-caret d-flex align-items-center justify-content-center "
                  style={{
                    width: "49.6px",
                    height: "40px",
                    border: "none",
                    backgroundColor: "white",
                  }}
                >
                  <Image
                    src={logoViUs}
                    style={{
                      width: logoViUs === logoVN ? "32px" : "24px",
                      height: logoViUs === logoVN ? "32px" : "24px",
                    }}
                    alt="vn"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    className="flag-item"
                    onClick={() => handleLanguageChange(logoUS)}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <Image src={logoUS} width="24" height="32" alt="en" />
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="flag-item"
                    onClick={() => handleLanguageChange(logoVN)}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={logoVN}
                        style={{ width: "32px", height: "32px" }}
                        alt="vi"
                      />
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {user === null ? (
                <ButtonCustom
                  bgrColor="#EEEEEE"
                  onClick={() => {
                    navigate("/dang-nhap");
                  }}
                  icon="bi bi-person-circle fs-5 me-2"
                  text="Tài khoản"
                  color="#DE3241"
                />
              ) : (
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
                          src={
                            user?.avatar?.startsWith("https://")
                              ? user.avatar
                              : `http://localhost:8080/avatar/${user?.avatar}`
                          }
                          roundedCircle
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <span
                        className="ms-2 text-truncate"
                        style={{
                          maxWidth: "220px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "inline-block",
                        }}
                      >
                        {user && user.fullname}
                      </span>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ marginTop: "8px" }}>
                    <Dropdown.Item onClick={() => navigate("/tai-khoan/ho-so")}>
                      <i className="bi bi-person-fill me-2"></i>Tài khoản
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => navigate("/tai-khoan/don-hang")}
                    >
                      <i className="bi bi-card-checklist me-2"></i>Đơn hàng
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={handleLogout}
                      style={{ color: "#DE3241" }}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
