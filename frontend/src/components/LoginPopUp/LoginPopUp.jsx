import React, { useContext, useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/Storecontext";
import axios from "axios";

const LoginPopUp = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setcurrState] = useState("Login");
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div>
      <div className="login-popup">
        <form onSubmit={onLogin} className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <div className="login-popup-input">
            {currState === "Login" ? (
              <></>
            ) : (
              <input
                name="name"
                onChange={onchangeHandler}
                value={data.name}
                type="text"
                placeholder="Your Name"
                required
              />
            )}

            <input
              name="email"
              onChange={onchangeHandler}
              value={data.email}
              type="email"
              placeholder="Your email"
              required
            />
            <input
              name="password"
              onChange={onchangeHandler}
              value={data.password}
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit">
            {currState === "Sign Up" ? "Create Account" : "Login"}
          </button>
          <div className="login-popup-condition">
            <input type="checkBox" required />
            <p>By Continuing. I Agree to the terms of use & privacy policy</p>
          </div>
          {currState === "Login" ? (
            <p>
              Create a new Account?{" "}
              <span onClick={() => setcurrState("Sign Up")}>Click here</span>
            </p>
          ) : (
            <p>
              Already Have an accont?{" "}
              <span onClick={() => setcurrState("Login")}>Login Here</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPopUp;
