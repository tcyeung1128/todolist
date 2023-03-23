import React from "react";
import "./Title.css";

export default function Title(props) {
  return (
    <div>
      <h1 className="welcome">welcome,{props.name}</h1>
    </div>
  );
}
