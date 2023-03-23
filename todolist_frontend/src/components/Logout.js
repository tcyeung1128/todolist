import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Logout.css';

export default function Logout() {
  const [logout, setLogout] = useState(false);
  let navigate = useNavigate();
  function checkLogout() {
    localStorage.clear();
    // return redirect('/csa')
    console.log("dsa");
    setLogout(true);
  }
  useEffect(() => {
    if (!localStorage.getItem("user_ac") || !localStorage.getItem("token")) {
      navigate("/");
    }
  }, [logout]);
  return (
    <div>
      <button className="logoutButton" onClick={() => checkLogout()}>Logout</button>
    </div>
  );
}
