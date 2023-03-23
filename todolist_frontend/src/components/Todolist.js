import React from "react";
import { useState, useEffect, useContext } from "react";
import { TodoContext } from "../Context";
import Deletelist from "./Deletelist";
import { getList, putList } from "../API/API";
import Addlist from "../components/Addlist";
import "./Todolist.css";

export default function Todolist(props) {
  const { todoItems, setTodoItems } = useContext(TodoContext);
  const [newTodoItems, setNewTodoItems] = useState(todoItems);
  const [search, setSearch] = useState("");
  const [text, setText] = useState([]);
  useEffect(() => {
    console.log(text);
    new Promise(function (resolve, reject) {
      resolve();
      reject();
    })
      .then(() => {
        return putList(text.text_id, text.user_text);
      })
      .then(() => {
        return getList();
      })
      .then((data) => {
        setTodoItems(data);
      })
      .catch((error) => console.log(error));
  }, [text]);
  useEffect(() => {
    setNewTodoItems(
      todoItems.filter((todoItem) => todoItem.user_text.includes(search))
    );
    console.log(newTodoItems);
  }, [search, todoItems]);

  return (
    <div>
        <div>
          <input
            className="search"
            placeholder="search"
            onChange={(e) => setSearch(e.currentTarget.value)}
          ></input>
        </div>
        <div>
          <Addlist />
        </div>

      {newTodoItems.map((todoItem) => (
        <div className="card" >
            <div key={todoItem.text_id}>
                <textarea
                  className="textarea"
                  id="todoItem.text_id"
                  defaultValue={todoItem.user_text}
                  onBlur={(e) =>
                    setText({
                      text_id: todoItem.text_id,
                      user_text: e.currentTarget.value,
                    })
                  }
                ></textarea>
                <Deletelist
                  del={todoItem.text_id}
                  setTodoItems={setTodoItems}
                />
            </div>
            </div>
      ))}
    </div>
  );
}
