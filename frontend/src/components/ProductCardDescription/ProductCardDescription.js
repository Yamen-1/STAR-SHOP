import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import "./ProductCardDescription.scss";
import useCart from "../../hooks/useCart";
import StarRating from "../StarRating/StarRating";

export default function ProductCardDescription(props) {
  const [productData, setProductData] = useState([]);
  const id = props.id;

  async function getResponse() {
    const res = await fetch(`http://localhost:3001/products/${id}`).then(
      (res) => res.json()
    );
    res.id = res._id;
    setProductData(res);
  }

  useEffect(() => {
    getResponse();
  }, []);

  const cart = useCart();

  return (
    <div className="context">
      <div className="img">
        <Card.Img src={productData.image} className="card-img" />
      </div>
      <div className="infos">
        <Card className="card">
          <Card.Body className="card-body">
            <Card.Title>
              <h1> {productData.title}</h1>
              <br /> {productData.description}
            </Card.Title>
            <Card.Title className="card-title2">
              <br />
              <span className="h3">{productData.price} $ </span>
              <p className="costs">incl. VAT., excl. Shipping costs</p>
              <div className="rating">
                <div>
                  <StarRating rating={productData.rating?.rate} />
                </div>
                <div>{productData.rating?.rate}</div>
              </div>
            </Card.Title>
            <div className="buttons">
              <Link to="/myCart" id="link-go-to-card">
                Go to Cart
              </Link>
              <Button
                onClick={() =>
                  cart.addProduct({
                    product: productData._id,
                    amount: 1,
                  })
                }
                id="link-add-to-card"
              >
                Add to Cart
              </Button>
            </div>
            {cart.error && <div className="error">{cart.error}</div>}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
