import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { login } from "../API/API";
import "./Login.css";

export default function Login() {
  let [user_ac, setUser_ac] = useState("");
  let [user_password, setUser_password] = useState("");
  let [Login, setLogined] = useState(false);
  let navigate = useNavigate();
  console.log("Login page");
  function checkLogin() {
    new Promise(function (resolve, reject) {
      resolve();
      reject();
    })
      .then(() => {
        return login(user_ac, user_password);
      })
      .then(() => {
        setLogined(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if (localStorage.getItem("user_ac") && localStorage.getItem("token")) {
      navigate("/home");
    }
  }, [Login]);

  return (
    <>
      <div className="loginAccountTitle">Login</div>
      <form>
        <input
        className="loginInput"
          type="text"
          name="accou"
          placeholder="Account name"
          onChange={(e) => setUser_ac(e.currentTarget.value)}
        ></input>
        <br></br>
        <input
        className="loginInput"
          type="password"
          name="pwd"
          placeholder="Password"
          onChange={(e) => setUser_password(e.currentTarget.value)}
        ></input>
      </form>
      <button className="loginButton" onClick={() => checkLogin(user_ac, user_password)}>Login</button>
      <Link to="/create">
        <button className="loginButton">Create account</button>
      </Link>
    </>
  );
}
