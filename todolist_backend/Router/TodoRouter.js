const express = require("express");
const jwt = require("jsonwebtoken");

class TodoRouter {
  constructor(toDoService) {
    this.toDoService = toDoService;
  }

  router() {
    let router = express.Router();
    router.use("/", this.auth.bind(this));
    router.get("/todolist/:id", this.getList.bind(this));
    router.post("/addtodolist", this.postList.bind(this));
    router.put("/puttodolist/:text_id", this.putList.bind(this));
    router.delete("/deletelist/:user_ac/:text_id", this.deleteList.bind(this));
    return router;
  }

  auth(req, res, next) {
    if (req.headers.authorization) {
      new Promise(function (resolve, reject) {
        resolve();
        reject();
      })
        .then(() => {
          return this.toDoService.auth(req.headers.authorization);
        })
        .then((data) => {
          console.log("authed");
          next();
        });
    } else {
      res.json({ backend: "Not authorization" });
    }
  }

  getList(req, res, next) {
    if (
      req.params.id ===
      jwt.verify(
        req.headers.authorization.split(" ")[1],
        process.env.ACCESS_TOKEN_SECRET
      )
    ) {
      new Promise(function (resolve, reject) {
        resolve();
        reject();
      })
        .then(() => {
          return this.toDoService.getText(req.headers.authorization);
        })
        .then((data) => {
          // console.log(data);
          res.json(data);
        })
        .catch((error) => {
          console.log(error);
          res.json({ backend: "error" });
        });
    } else {
      res.json({ backend: "error" });
    }
  }

  postList(req, res, next) {
    if (
      req.body.user_ac ===
      jwt.verify(
        req.headers.authorization.split(" ")[1],
        process.env.ACCESS_TOKEN_SECRET
      )
    ) {
      new Promise(function (resolve, reject) {
        resolve();
        reject();
      })
        .then(() => {
          return this.toDoService.addText(
            req.headers.authorization,
            req.body.user_text
          );
        })
        .then(() => {
          return this.toDoService.getText(req.headers.authorization);
        })
        .then((data) => {
          // console.log(data);
          res.json(data);
        })
        .catch((error) => {
          console.log(error);
          res.json({ backend: "error" });
        });
    } else {
      res.json({ backend: "error" });
    }
  }

  putList(req, res, next) {
    console.log("putt");
    console.log(req.params.text_id);
    console.log(req.body);
    if (
      req.body.user_ac ===
      jwt.verify(
        req.headers.authorization.split(" ")[1],
        process.env.ACCESS_TOKEN_SECRET
      )
    ) {
      new Promise(function (resolve, reject) {
        resolve();
        reject();
      })
        .then(() => {
          return this.toDoService.putText(
            req.body.user_ac,
            req.params.text_id,
            req.body.user_text,
            req.headers.authorization
          );
        })
        .then((data) => {
          // console.log(data);
          res.json(data);
        })
        .catch((error) => {
          console.log(error);
          res.json({ backend: "error" });
        });
    } else {
      res.json({ backend: "error" });
    }
  }

  deleteList(req, res, next) {
    console.log("delete");
    console.log(req.params.user_ac);
    console.log(req.params.text_id);
    if (
      req.params.user_ac ===
      jwt.verify(
        req.headers.authorization.split(" ")[1],
        process.env.ACCESS_TOKEN_SECRET
      )
    ) {
      new Promise(function (resolve, reject) {
        resolve();
        reject();
      })
        .then(() => {
          return this.toDoService.delText(
            req.headers.authorization,
            req.params.text_id
          );
        })
        .then(() => {
          console.log("deled");
        })
        .then(() => {
          return this.toDoService.getText(req.headers.authorization);
        })
        .then((data) => {
          // console.log(data);
          res.json(data);
        })
        .catch((error) => {
          console.log(error);
          res.json({ backend: "error" });
        });
    } else {
      res.json({ backend: "error" });
    }
  }
}
module.exports = TodoRouter;
