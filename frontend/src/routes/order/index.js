import "./index.scss";
import Layout from "../../Layout";
import ListGroup from "react-bootstrap/ListGroup";
import useCart from "../../hooks/useCart";
import moment from "moment";
import useUser from "../../hooks/useUser";
import { Link } from "react-router-dom";

export default function Order() {
  const user = useUser();
  const cart = useCart();
  if (!cart.data || !user.data) {
    return;
  }
  return (
    <Layout>
      <div className="orderContainer">
        <div className="productsOrder">
          <h1 className="myOrders">My Orders</h1>
          <div className="scrollingOrder">
            <ListGroup>
              {cart.data?.products.map((item) => {
                return (
                  <ListGroup key={item.product._id} className="listGroup">
                    <div className="cartInfo">
                      <div className="img-Titel">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                        />
                        <div className="titelInfo">
                          <p>{item.product.title}</p>
                        </div>
                      </div>
                      <div className="quantityInfo">{item.amount}</div>
                      <div className="priceInfo">
                        {item.product.price * item.amount} $
                      </div>
                    </div>
                  </ListGroup>
                );
              })}
            </ListGroup>
          </div>
        </div>
        <div className="towBoxes">
          <div className="payment">
            <div className="div">
              <h5>
                Shipping adress
                <br />
              </h5>
              <p className="name">{user.data.name}</p>
              <div className="deliveryToArea">
                <p>
                  {cart.data.address.street}
                  <br />
                  {cart.data.address.zipcode}, {cart.data.address.city}
                </p>
                <p>method of payment : {cart.data.buyMethode}</p>
              </div>
              <h6 className="deliveryArea">
                Delivery: {moment().add(7, "days").format("DD.MM.YYYY")} &nbsp;
                - &nbsp;
                {moment().add(9, "days").format("DD.MM.YYYY")}
              </h6>
              <Link to={"/myCart"} className="link-button">
                Edit Your Order
              </Link>
            </div>
          </div>
          <div className="paymentTwo">
            <h2 className="h2">Invoice amount</h2>
            <div className="paragraph"></div>
            <div className="paragraph">
              <p>
                <span className="span">VAT included.</span>
              </p>
              <p>{(cart.cartTotal + 5.95).toFixed(2)} $</p>
            </div>
            <hr />
            <br />
            <Link to={"/thanks"} className="bt-buyNow">
              Buy Now
            </Link>
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </Layout>
  );
}
