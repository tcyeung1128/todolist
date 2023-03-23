import logo from "./logo.svg";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Create from "./pages/CreateAC";
import { useState, useEffect } from "react";
import { TodoContext } from "./Context";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todoItems, setTodoItems] = useState([]);

  return (
    <div className="App">
      <TodoContext.Provider value={{ todoItems, setTodoItems }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </TodoContext.Provider>
    </div>
  );
}

export default App;
