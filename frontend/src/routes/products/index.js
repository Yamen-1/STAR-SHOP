import "./index.scss";
import Layout from "../../Layout";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, InputGroup } from "react-bootstrap";
import SearchFilter from "react-filter-search";
import ProductCard from "../../components/producrCard/ProductCard";
import { useSearchParams } from "react-router-dom";

export default function Products() {
  const [searchInput, setSearchInput] = useState("");
  const [productData, setProductData] = useState([]);
  const [filter, setFilter] = useState(productData);
  const [params] = useSearchParams();
  const [category, setCategory] = useState(params.get("category") || "");

  async function getResponse() {
    const res = await fetch(
      "http://localhost:3001/products?category=" + category
    ).then((res) => res.json());
    setProductData(res);
    setFilter(res);
  }

  useEffect(() => {
    getResponse();
  }, [category]);

  return (
    <>
      <Layout>
        <div className="products">
          <div className="products-buttons">
            <button
              className="button products-All-button"
              onClick={() => setCategory("")}
            >
              All
            </button>
            <button
              className="button products-men-button"
              onClick={() => setCategory("men's clothing")}
            >
              men's clothing
            </button>
            <button
              className="button products-women-button"
              onClick={() => setCategory("women's clothing")}
            >
              women's clothing
            </button>
            <button
              className="button products-electronics-button"
              onClick={() => setCategory("electronics")}
            >
              electronics
            </button>
            <button
              className="button products-jewelery-button"
              onClick={() => setCategory("jewelery")}
            >
              jewellery
            </button>
          </div>

          <Row id="row" className="justify-content-center ">
            <Col
              id="col"
              xs={10}
              md={7}
              lg={6}
              xl={4}
              className="mb-3 mx-auto text-center"
            >
              <InputGroup id="inputGroup">
                <input
                  type="text"
                  name="search"
                  className="input-search"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                  }}
                />
              </InputGroup>
            </Col>
            <SearchFilter
              value={searchInput}
              data={filter}
              renderResults={(results) => (
                <Row className="justify-content-center">
                  {results.map((item, i) => (
                    <ProductCard data={item} key={i} />
                  ))}
                </Row>
              )}
            />
          </Row>
        </div>
      </Layout>
    </>
  );
}
