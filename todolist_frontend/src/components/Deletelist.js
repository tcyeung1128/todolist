import React from "react";
import { useState, useEffect, useContext } from "react";
import { getList, delList } from "../API/API";
import { TodoContext } from "../Context";
import './DeleteList.css';

export default function deleteList(props) {
  // const { todoItems, setTodoItems } = useContext(TodoContext);
  let text_id = props.del;
  function deleteText(text_id) {
    new Promise(function (resolve, reject) {
      resolve();
      reject();
    })
      .then(() => {
        return delList(text_id);
      })
      .then(() => {
        return getList();
      })
      .then((data) => {
        props.setTodoItems(data);
      })
      .catch((error) => console.log(error));
  }
  return (
    <div>
      <button className="delButton" onClick={() => deleteText(text_id)}>del</button>
    </div>
  );
}
