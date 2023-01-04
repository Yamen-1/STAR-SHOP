import * as React from "react";
import useUser from "./useUser";

const Context = React.createContext({
  isEmpty: false,
  cartTotal: 0,
  data: null,
  error: "",
  buyCart: () => Promise.resolve(),
  addProduct: () => Promise.resolve(),
  deletProduct: () => Promise.resolve(),
  deletProducts: () => Promise.resolve(),
  updateProduct: () => Promise.resolve(),
});
export function CartProvider(props) {
  const user = useUser();
  const [cart, setCart] = React.useState(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!user.data) {
      return;
    } else {
      setError("");
    }
  }, [user.data]);
  React.useEffect(() => {
    if (!user.data) {
      setCart(null);
      return;
    }
    fetch("http://localhost:3001/cart", {
      method: "GET",
      credentials: "include",
    }).then(async (res) => {
      if (res.status === 200) {
        const result = await res.json();
        setCart(result);
      }
    });
  }, [user.data]);
  let cartTotal = 0;
  if (cart) {
    console.log(cart);
    cart.products.forEach((element) => {
      cartTotal += element.product.price * element.amount;
    });
  }
  const data = {
    cartTotal: cartTotal,
    isEmpty: cart ? cart.products.length === 0 : true,
    data: cart,
    error: error,
    buyCart: async (body) => {
      if (!user.data) {
        return;
      }
      setError("");
      const res = await fetch("http://localhost:3001/cart/buyCart", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        const result = await res.json();
        setCart(result);
      } else {
        setError("something was rong");
      }
    },
    addProduct: async (body) => {
      if (!user.data) {
        setError("you are not logged in");
        return;
      }
      setError("");
      const res = await fetch("http://localhost:3001/cart/addProduct", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        const result = await res.json();
        setCart(result);
      } else {
        setError("something was rong");
      }
    },
    deletProduct: async (body) => {
      if (!user.data) {
        return;
      }
      setError("");
      const res = await fetch("http://localhost:3001/cart/deletProduct", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        const result = await res.json();
        setCart(result);
      } else {
        setError("something was rong");
      }
    },
    deletProducts: async () => {
      if (!user.data) {
        return;
      }
      setError("");
      const res = await fetch("http://localhost:3001/cart/deletProducts", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        const result = await res.json();
        setCart(result);
      } else {
        setError("something was rong");
      }
    },
    updateProduct: async (body) => {
      if (!user.data) {
        return;
      }
      setError("");
      const res = await fetch("http://localhost:3001/cart/updateProduct", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        const result = await res.json();
        setCart(result);
      } else {
        setError("something was rong");
      }
    },
  };

  return <Context.Provider value={data}>{props.children}</Context.Provider>;
}
export default function useCart() {
  return React.useContext(Context);
}
