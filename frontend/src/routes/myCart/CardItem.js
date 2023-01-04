import "./cardItem.scss";
import { RiDeleteBinLine } from "react-icons/ri";
import { Button, Form } from "react-bootstrap";
import useCart from "../../hooks/useCart";

export function CardItem(props) {
  const cart = useCart();

  return (
    <>
      <hr className="hr" style={{ width: "90%" }} />
      <div
        key={props.index}
        className="container"
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <div
          className="secoundContainer"
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "80%",
          }}
        >
          <img
            className="image"
            src={props.item.image}
            style={{ width: "17rem", height: "17rem" }}
            alt={props.item.title}
          />

          <div
            className="infos"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              margin: "0.5rem 2rem",
            }}
          >
            <h6
              style={{
                whiteSpace: "wrap",
                width: "20rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontWeight: "bolder",
                fontSize: "x-large",
              }}
            >
              {props.item.title}
            </h6>

            <div
              className="formInfos"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Form.Select
                value={props.amount}
                onChange={(event) =>
                  cart.updateProduct({
                    productId: props.item._id,
                    amount: parseInt(event.target.value),
                  })
                }
                className="form"
                style={{
                  maxWidth: "7rem",
                }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="5">6</option>
                <option value="5">7</option>
                <option value="5">8</option>
                <option value="5">9</option>
                <option value="5">10</option>
              </Form.Select>
            </div>
            <Button
              className="button"
              variant="outline-danger"
              onClick={() =>
                cart.deletProduct({
                  productId: props.item._id,
                })
              }
              style={{
                maxWidth: "10rem",
                display: "flex",
                gap: "0.5rem",
              }}
            >
              <RiDeleteBinLine size={20} />
              Remove Item
            </Button>
          </div>
        </div>
        <div
          className="price"
          style={{
            flexGrow: "0",
            textAlign: "right",
            padding: "2.5rem",
            fontWeight: "bolder",
          }}
        >
          {props.item.price * props.amount} $
        </div>
      </div>
    </>
  );
}
