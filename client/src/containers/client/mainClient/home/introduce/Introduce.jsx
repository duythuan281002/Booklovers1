import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import banner1 from "../../../../../assets/image/banner1.jpg";
import banner2 from "../../../../../assets/image/banner2.jpg";
import banner3 from "../../../../../assets/image/banner3.jpg";
import banner4 from "../../../../../assets/image/banner4.jpg";
import "./Introduce.scss";
import ButtonCustom from "../../../../../components/button/ButtonCustom";
import { useNavigate } from "react-router-dom";

const Introduce = () => {
  const navigate = useNavigate();

  const banners = [banner1, banner2, banner3, banner4];
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleBuyNow = () => {
    navigate("/san-pham");
  };
  return (
    <div className="introduce">
      <Image
        src={banners[currentBanner]}
        style={{ width: "100%", height: "600px" }}
      />
      <div className="introduce-con">
        <Container className="introduce-con-content">
          <div className="introduce-left">
            <h1 className="fw-bold mb-4">ƯU ĐÃI DÀNH RIÊNG CHO BOOKLOVERS</h1>
            <h3 className="mb-4">
              Giảm giá lên đến 30% cho mọi đầu sách yêu thích!
            </h3>
            <p className="mb-4">
              Chào mừng bạn đến với thiên đường của những người yêu sách! Khám
              phá hàng ngàn tựa sách hấp dẫn, giá ưu đãi, chất lượng đảm bảo.
            </p>

            <ButtonCustom
              text="Mua ngay →"
              bgrColor="#D14552"
              onClick={handleBuyNow}
            />
          </div>
          <div className="introduce-right"></div>
        </Container>
      </div>
    </div>
  );
};

export default Introduce;
