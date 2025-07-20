import React from "react";
import { Card } from "react-bootstrap";
import "./FeaturedPostCard.scss";
import { useNavigate } from "react-router-dom";

const FeaturedPostCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="mb-3 featuredPostCard"
      style={{ cursor: "pointer", border: "none" }}
      onClick={() => {
        navigate(`/bai-viet/chi-tiet-bai-viet/${blog.id}`);
      }}
    >
      <div className="d-flex p-2">
        <img
          src={`http://localhost:8080/blogs/${blog.image}`}
          alt={blog.title}
          style={{
            width: 150,
            height: 91,
            objectFit: "cover",
            borderRadius: 4,
          }}
          className="me-3"
        />
        <div>
          <Card.Text className="card-date">{blog.title}</Card.Text>
          <Card.Text
            style={{
              fontSize: "12px",
              color: "#757575",
              fontStyle: "italic",
              fontWeight: "500",
              margin: "0",
            }}
          >
            {blog.author}
          </Card.Text>
          <Card.Text
            style={{
              color: "#a7a7a7",
              fontSize: "12px",
              padding: "5px 0",
              margin: "0",
              fontWeight: "500",
              textAlign: "right",
            }}
            className="text-muted"
          >
            {blog.date}
          </Card.Text>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedPostCard;
