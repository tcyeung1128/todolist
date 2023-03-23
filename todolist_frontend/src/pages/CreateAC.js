import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getList, createAccount } from "../API/API";
import "./CreateAC.css";

export default function CreateAC() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [createAc, setCreateAc] = useState(false);
  let navigate = useNavigate();
  function createNewAccount() {
    new Promise(function (resolve, reject) {
      resolve();
      reject();
    })
      .then(() => {
        console.log("ewq")
        return createAccount(account, password);
      })
      .then((data)=>{
        console.log(data)
      })
      .then(() => {
        return setCreateAc(true);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    if (createAc == true) {
      navigate("/");
    }
  }, [createAc]);
  return (
    <div>
      <div className="createAccountTitle">Create Account</div>
      <input
      className="createInput"
        type="text"
        placeholder="Input your account"
        onChange={(e) => setAccount(e.currentTarget.value)}
      ></input>
      <br></br>
      <input
      className="createInput"
        type="password"
        placeholder="Input your password"
        onChange={(e) => setPassword(e.currentTarget.value)}
      ></input>
      <br></br>
      <button className="createButton" onClick={() => createNewAccount()}>Create Account</button>
      <Link to="/">
        <button className="createButton">Back</button>
      </Link>
    </div>
  );
}
