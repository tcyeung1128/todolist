import React from "react";
import { useState, useEffect, useContext } from "react";
import { TodoContext } from "../Context";
import { getList, postList } from "../API/API";
import "./Addlist.css";

export default function Addlist() {
  const { todoItems, setTodoItems } = useContext(TodoContext);
  const [text, setText] = useState("");
  function sendText() {
    new Promise(function (resolve, reject) {
      resolve();
      reject();
    })
      .then(() => {
        return postList(text);
      })
      .then(() => {
        return getList();
      })
      .then((data) => {
        setTodoItems(data);
        setText("");
      })
      .catch((error) => console.log(error));
  }
  return (
    <div>
      <input
      className="addlistInput"
        value={text}
        placeholder="Input your todo"
        onChange={(e) => setText(e.currentTarget.value)}
      ></input>
      <button className="addbutton" type="submit" onClick={() => sendText()}>
        Add
      </button>
    </div>
  );
}
