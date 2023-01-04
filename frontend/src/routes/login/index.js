import * as React from "react";
import "./index.scss";
import Layout from "../../Layout";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showRegister, setShowRegister] = React.useState(false);
  const [name, setName] = React.useState("");
  const user = useUser();
  const navigate = useNavigate();

  const handeleLoginClick = async (e) => {
    e.preventDefault();

    const status = await user.login({
      email: email,
      password: password,
    });
    if (status === 200) {
      navigate("/account");
    }
  };

  const handeleRegisterClick = async (e) => {
    e.preventDefault();

    const status = await user.register({
      email: email,
      password: password,
      name: name,
    });
    if (status === 200) {
      navigate("/account");
    }
  };

  if (showRegister) {
    return (
      <Layout>
        <div className="backgroundImg"></div>
        <div className="Login">
          <form className="box" onSubmit={handeleRegisterClick}>
            <h1 className="h1-login">Register</h1>

            <hr />
            <div className="input-group-login">
              <div className="label">Email</div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group-login">
              <div className="label">Password</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="input-group-login">
              <div className="label">Name</div>
              <input
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div
              className="toggle-register"
              onClick={() => setShowRegister(false)}
            >
              I already have an account
            </div>

            <button type="submit">send</button>
          </form>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="backgroundImg"></div>
      <div className="Login">
        <form className="box" onSubmit={handeleLoginClick}>
          <h1 className="h1-login">Login</h1>
          <p>Log in to your STAR SHOP account.</p>
          <hr />
          <div className="input-group-login">
            <div className="label">Email</div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group-login">
            <div className="label">Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div
            className="toggle-register"
            onClick={() => setShowRegister(true)}
          >
            I don't have an account yet
          </div>

          <button type="submit">send</button>

          {user.error && <div className="error">{user.error}</div>}
        </form>
      </div>
    </Layout>
  );
}
