import React from "react";
import { useState, useEffect, useContext } from "react";
import { TodoContext } from "../Context";
import { getList } from "../API/API";
import Title from "../components/Title";
import Todolist from "../components/Todolist";
import Logout from "../components/Logout";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Home.css";

export default function Home() {
  let navigate = useNavigate();
  const { todoItems, setTodoItems } = useContext(TodoContext);
  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("user_ac")) {
      new Promise(function (resolve, reject) {
        resolve();
        reject();
      })
        .then(() => {
          return getList();
        })
        .then((data) => {
          setTodoItems(data);
        })
        .catch((error) => console.log(error));
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="homeTitle">
        <div className="homeTitle2">
          <div className="homeTitle3">
            <Title name={localStorage.getItem("user_ac")} />
          </div>
          <div className="homeLogout">
            <Logout />
          </div>
        </div>
      </div>

      <Container>
        <Row>
          <Todolist />
        </Row>
      </Container>
    </>
  );
}
