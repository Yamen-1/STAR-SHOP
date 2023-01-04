import "./index.scss";
import Layout from "../../Layout";
import { BiChevronLeft } from "react-icons/bi";
import { CardItem } from "./CardItem";
import {
  FaCcPaypal,
  FaCcMastercard,
  FaCcVisa,
  FaCcAmex,
  FaCcDiscover,
} from "react-icons/fa";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import useCart from "../../hooks/useCart";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function MyCart(props) {
  const cart = useCart();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [buyMethode, setBuyMethode] = useState();
  return (
    <>
      <Layout>
        <div className="großeConteiner" style={{ display: "flex" }}>
          <Container
            className="containerPos"
            style={{
              top: "10%",
              display: "flex",
              flexDirection: "column",
              marginRight: "1rem",
              maxWidth: "70%",
              marginLeft: "2rem",
              marginTop: "2rem",
            }}
          >
            {cart.isEmpty ? (
              <>
                <div
                  className="boxEmpty"
                  style={{
                    border: "1px solid",
                    width: "55rem",
                    height: "15rem",
                    padding: "20px",
                    borderRadius: "5px",
                    backgroundColor: "#ffffff ",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                  }}
                >
                  <p style={{ fontSize: "xx-large" }}>
                    Your shopping cart is empty... <br />
                    continue shopping
                  </p>
                  <Link
                    to="/products"
                    className="linkCountinueShopping"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "25rem",
                      textDecoration: "none",
                      color: "black",
                      background: "var(--accent)",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      fontSize: "x-large",

                      fontFamily: "Cutive Mono",
                      fontWeight: "bold",
                      border: "1px solid black",
                    }}
                  >
                    <BiChevronLeft size={35} />
                    continue shopping
                  </Link>
                </div>
              </>
            ) : (
              <div className="header">
                <h1 style={{ color: "black" }}>The Cart</h1>
                <Button
                  variant="outline-danger"
                  className="clearButton"
                  style={{ width: "10.3rem" }}
                  onClick={() => cart.deletProducts()}
                >
                  Clear Cart
                </Button>
              </div>
            )}
            <Row className="rowResponsive">
              <div className="allItems" style={{ marginBottom: "5" }}>
                {cart.data?.products.map((item, index) => {
                  return (
                    <CardItem
                      index={index}
                      item={item.product}
                      key={index}
                      amount={item.amount}
                    />
                  );
                })}
              </div>
              {!cart.isEmpty && (
                <Row
                  style={{
                    position: "fixed",
                    bottom: 0,
                    background: "var(--background)",
                    textAlign: "right",
                    width: "65rem",
                  }}
                ></Row>
              )}
            </Row>
          </Container>
          <div className="payment-boxes">
            {cart.isEmpty ? (
              <div></div>
            ) : (
              <div className="boxes">
                <div className="payment1">
                  <h1 className="h1">Summary</h1>
                  <div className="paragraph">
                    <p>Total Price</p>
                    <p> {cart.cartTotal.toFixed(2)} $</p>
                  </div>
                  <div className="paragraph">
                    <p>Shipping</p>
                    <p>5,95 $</p>
                  </div>
                  <hr />
                  <div className="paragraph">
                    <p>
                      invoice amount <span className="span">VAT included.</span>
                    </p>
                    <p>{(cart.cartTotal + 5.95).toFixed(2)} $</p>
                  </div>
                  <hr />
                  <Form>
                    <Form.Group controlId="formGridAddress1">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={{ backgroundColor: "var(--background)" }}
                      />
                    </Form.Group>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          style={{ backgroundColor: "var(--background)" }}
                        />
                      </Form.Group>

                      <Form.Group as={Col}>
                        <Form.Label>Zip</Form.Label>
                        <Form.Control
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                          style={{ backgroundColor: " var(--background)" }}
                        />
                      </Form.Group>
                    </Row>
                    <FloatingLabel label="Choose your payment method">
                      <Form.Select
                        value={buyMethode}
                        onChange={(e) => setBuyMethode(e.target.value)}
                        style={{ backgroundColor: " var(--background)" }}
                      >
                        <option value="PayPal">PayPal</option>
                        <option value="Visa">Visa</option>
                        <option value="MasterCard">MasterCard</option>
                        <option value="Discover">Discover</option>
                        <option value="Amex">Amex</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Form>
                  <Link
                    to={"/order/"}
                    onClick={(e) => {
                      cart.buyCart({
                        address: {
                          street: address,
                          city: city,
                          zipcode: zip,
                        },
                        buyMethode: buyMethode,
                      });
                    }}
                    className="bt-buyNow"
                  >
                    To Checkout
                  </Link>
                </div>
                <div className="payment2">
                  <div className="div1">
                    <h6>This is how you can pay</h6>
                    <div className="methods-of-payment">
                      <FaCcPaypal size={40} color="blue" />
                      <FaCcMastercard size={40} color="red" />
                      <FaCcVisa size={40} color="darkblue" />
                      <FaCcAmex size={40} color=" orange" />
                      <FaCcDiscover size={40} color=" grey" />
                    </div>
                  </div>
                  <div className="div2">
                    <h6>This is how you can have it delivered</h6>
                    <div className="methods-of-payment2">
                      <img
                        src="https://www.wohnkabinen-shop.de/media/image/fd/cc/38/DHL2016.jpg"
                        alt="DHL "
                        title="DHL "
                        className="sc-jOhDuK kAilzX sc-bBrHrO kFHLcB dhl"
                      ></img>
                      <img
                        src="https://www.hermesworld.com/remote/content/logos/hermes-logo-366x183_teaser560x280.jpg"
                        alt="Hermes"
                        title="Hermes"
                        className="sc-jOhDuK kAilzX sc-bBrHrO kFHLcB hermes"
                      ></img>
                      <img
                        src="https://www.logistik-watchblog.de/images/2019/08/gls_logo_1.png"
                        alt="GLS"
                        title="GLS"
                        className="sc-jOhDuK kAilzX sc-bBrHrO kFHLcB gls"
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
