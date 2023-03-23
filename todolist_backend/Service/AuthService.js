const jwt = require("jsonwebtoken");
require("dotenv").config();
console.log("123")

class AuthService {
  constructor(knex) {
    this.knex = knex;
  }

  login(user_ac, user_password) {
    return new Promise(function (resolve, reject) {
      resolve();
      reject();
    })
      .then(() => {
        console.log(user_ac);
        console.log(user_password);
        return this.knex("*")
          .from("todolist_user")
          .where("user_ac", "=", user_ac)
          .then((data) => {
            if (
              data.length > 0 &&
              data[0].user_ac == user_ac &&
              data[0].user_password == user_password
            ) {
              console.log("logined");
              let auth = jwt.sign(user_ac, process.env.ACCESS_TOKEN_SECRET);
              
              return auth;
            }
          })
          .then((auth) => {
            console.log(auth);
            return auth;
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createAccount(user_ac, user_password) {
    return new Promise(function (resolve, reject) {
      resolve();
      reject();
    })
      .then(() => {
        return this.knex("todolist_user")
          .insert([{ user_ac: user_ac, user_password: user_password }])
          .then((data) => {
            // console.log(data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }
}
module.exports = AuthService;
