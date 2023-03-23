const jwt = require("jsonwebtoken");
require("dotenv").config();

class TodoService {
  constructor(knex) {
    this.knex = knex;
  }

  auth(authorization) {
    console.log(authorization);
    return new Promise(function (resolve, reject) {
      jwt.verify(
        authorization.split(" ")[1],
        process.env.ACCESS_TOKEN_SECRET,
        (error, payload) => {
          if (error) {
            reject(error);
          } else {
            resolve(payload);
          }
        }
      );
    })
      .then((payload) => {
        console.log(payload);
        return this.knex("*")
          .from("todolist_user")
          .where("user_ac", "=", payload)
          .then((data) => {
            console.log("data", data);
            return data;
          })
          .catch((error) => console.log("Not find the account"));
      })
      .then((data) => {
        console.log("ok");
        console.log(data);
        return data;
      })
      .catch((error) => console.log(error));
  }

  //get user todolist text
  getText(authorization) {
    return new Promise(function (resolve, reject) {
      jwt.verify(
        authorization.split(" ")[1],
        process.env.ACCESS_TOKEN_SECRET,
        (error, payload) => {
          if (error) {
            reject(error);
          } else {
            resolve(payload);
          }
        }
      );
    })
      .then((payload) => {
        return this.knex("*")
          .from("todolist_text")
          .where("user_ac", "=", payload)
          .then((data) => {
            // console.log(data);
            return data;
          })
          .catch((error) => console.log(error));
      })
      .then((data) => {
        return data;
      })
      .catch((error) => console.log(error));
  }

  addText(authorization, user_text) {
    return new Promise(function (resolve, reject) {
      jwt.verify(
        authorization.split(" ")[1],
        process.env.ACCESS_TOKEN_SECRET,
        (error, payload) => {
          if (error) {
            reject(error);
          } else {
            resolve(payload);
          }
        }
      );
    })
      .then((payload) => {
        console.log(payload, user_text);
        return this.knex("todolist_text")
          .insert([{ user_ac: payload, user_text: user_text }])
          .then((data) => {
            // console.log(data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }

  putText(user_ac, text_id, user_text,authorization) {
    return new Promise(function (resolve, reject) {
      jwt.verify(
        authorization.split(" ")[1],
        process.env.ACCESS_TOKEN_SECRET,
        (error, payload) => {
          if (error) {
            reject(error);
          } else {
            resolve(payload);
          }
        }
      );
    }).then(() => {
      return this.knex("todolist_text")
        .where("user_ac", "=", user_ac)
        .andWhere("text_id", "=", text_id)
        .update({
          user_text: user_text, 
        })
        .catch(error=>console.log(error));
    })
    .catch(error=>console.log(error));
  }

  delText(authorization, text_id) {
    return new Promise(function (resolve, reject) {
      jwt.verify(
        authorization.split(" ")[1],
        process.env.ACCESS_TOKEN_SECRET,
        (error, payload) => {
          if (error) {
            reject(error);
          } else {
            resolve(payload);
          }
        }
      );
    }).then((payload) => {
      return this.knex("todolist_text").where("text_id", "=", text_id).del();
    });
  }
}
module.exports = TodoService;
