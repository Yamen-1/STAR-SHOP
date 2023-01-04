import * as React from "react";

const Context = React.createContext({
  data: null,
  error: "",
  login: () => Promise.resolve(0), // oder können wir auch schreiben  login:async () =>
  register: () => Promise.resolve(0),
});

export function UserProvieder(props) {
  const [user, setUser] = React.useState(null);
  const [error, setErro] = React.useState("");
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    fetch("http://localhost:3001/user", {
      method: "GET",
      credentials: "include",
    }).then(async (res) => {
      if (res.status === 200) {
        const result = await res.json();
        setUser(result);
        setReady(true);
      }
    });
  }, []);
  const data = {
    data: user,
    error: error,

    login: async (body) => {
      setErro("");
      const res = await fetch("http://localhost:3001/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      if (res.status === 200) {
        setUser(result);
      } else if (result.errors) {
        setErro(result.errors[0].msg);
      } else if (result.error) {
        setErro(result.error);
      }
      return res.status;
    },
    register: async (body) => {
      setErro("");
      const res = await fetch("http://localhost:3001/user/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      if (res.status === 200) {
        setUser(result);
      } else if (result.errors) {
        setErro(result.errors[0].msg);
      } else if (result.error) {
        setErro(result.error);
      }
      return res.status;
    },
    logout: async () => {
      await fetch("http://localhost:3001/user/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
    },
  };
  return (
    <Context.Provider value={data}>{ready && props.children}</Context.Provider>
  );
}

export default function useUser() {
  return React.useContext(Context);
}
