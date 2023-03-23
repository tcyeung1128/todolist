const express = require("express");
const jwt = require("jsonwebtoken");

class AuthRouter {
  constructor(authService) {
    this.authService = authService;
  }

  router() {
    let router = express.Router();
    router.post("/", this.postLogin.bind(this));
    router.post("/create", this.createAccount.bind(this));
    return router;
  }

  postLogin(req, res, next) {
    // console.log(req.body.user_ac)
    // console.log("postLogin")
    // console.log(this.authService.say());
    new Promise(function (resolve, reject) {
      resolve();
      reject();
    })
      .then(() => {
        console.log("here")
        return this.authService.login(req.body.user_ac, req.body.user_password);
      })
      .then((auth) => {
        console.log(auth);
        return auth;
      })
      .then((auth) => {
        res.json({ token: "Bearer "+auth ,user_ac:req.body.user_ac});
      });
  }

  createAccount(req,res,next){
    new Promise(function (resolve, reject) {
      resolve();
      reject();
    })
    .then(()=>{
      return this.authService.createAccount(req.body.user_ac,req.body.user_password)
    })
    .then(() => {
      let auth = jwt.sign(req.body.user_ac, process.env.ACCESS_TOKEN_SECRET);
      res.json({ token: "Bearer "+auth ,user_ac:req.body.user_ac});
    })
    .catch((error) => {
      console.log(error);
      res.json({ backend: "error" });
    });
  }
}

module.exports = AuthRouter;
