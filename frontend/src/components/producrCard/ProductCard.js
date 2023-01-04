import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRating from "../StarRating/StarRating";
import "./productCard.scss";
import React from "react";

export default function ProductCard(props) {
  let { _id, image, price, title, rating } = props.data;

  return (
    <Card
      style={{
        width: "19.4rem",
        height: "38rem",
        backgroundColor: "#ffffff",
        border: "1px solid #dddddd",
      }}
      className={`text-center p-0 overflow-hidden  mx-auto mb-4`}
    >
      <div
        className={{
          height: "15rem",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "inherit",
        }}
      >
        <div style={{ width: "auto", height: "auto" }}>
          <Card.Img variant="top" src={image} className="cardImg img-fluid" />
        </div>
      </div>
      <Card.Body>
        <Card.Title
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Card.Title>
        <Card.Title>
          <span className="h4">{price} $</span>
        </Card.Title>
        <div className="starBG">
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <div>
              <StarRating rating={rating?.rate} />
            </div>
            <div>{rating.rate}</div>
          </div>
          <div>({rating.count})</div>
        </div>
        <Link to={"/product/" + _id} className={`d-flex viewButtons`}>
          View Product
        </Link>
      </Card.Body>
    </Card>
  );
}
