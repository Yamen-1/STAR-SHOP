import "./index.scss";
import Layout from "../../Layout";
import { Link } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";

export default function Overview() {
  return (
    <>
      <Layout>
        <div className="overview">
          <div className="imgBlock img1">
            <Link to="/products/?category=men's clothing" className="button">
              VIEW MEN'S CLOTHES PRODUCTS
            </Link>
          </div>
          <div className="imgBlock doppelBlock">
            <div className="imgBlock img2">
              <Link to="/products/?category=electronics" className="button2">
                VIEW ELECTRONICS PRODUCTS
              </Link>
            </div>
            <div className="imgBlock img3">
              <Link to="/products/?category=jewelery" className="button3">
                VIEW JEWELLERY PRODUCTS
              </Link>
            </div>
          </div>
          <div className="imgBlock img4">
            <Link to="/products/?category=women's clothing" className="button">
              VIEW WOMEN'S CLOTHES PRODUCTS
            </Link>
          </div>
        </div>

        <footer className="footer">
          <div className="footer-left">
            <p>
              General terms and conditions - data protection - managing cookies
              - imprint - online marketplace
            </p>
            <p>
              starshop.de has an average of 4.61 out of 5.00 stars, based on
              69729 Trusted Shops reviews within the last 12 months.
              <br />
              * All prices include statutory VAT plus shipping costs. The
              original price refers to the former StarShop price. Products
              without decoration.
              <br />
            </p>
          </div>
          <div className="footer-right">STARSHOP Germany SE & Co. KG</div>
          <div className="footer-contact">
            <p>You can also find us here</p>
            <div className="footer-icons">
              <a className="footer-icons-facebook" href="https://facebook.com">
                <BsFacebook />
              </a>
              <a
                className="footer-icons-instagram"
                href="https://www.instagram.com/"
              >
                <BsInstagram />
              </a>
              <a className="footer-icons-twitter" href="https://twitter.com/">
                <BsTwitter />
              </a>
            </div>
          </div>
        </footer>
      </Layout>
    </>
  );
}
