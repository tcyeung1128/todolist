const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

const AuthService = require("./Service/AuthService");
const AuthRouter = require("./Router/AuthRouter");
const authService = new AuthService(knex);
const authRouter = new AuthRouter(authService);

const ToDoService = require("./Service/TodoService");
const ToDoRouter = require("./Router/TodoRouter");
const toDoService = new ToDoService(knex);
const toDoRouter = new ToDoRouter(toDoService);

app.use("/", authRouter.router());
app.use("/user", toDoRouter.router());

app.listen(port, () => {
  console.log(`The app listening on port ${port}`);
});
