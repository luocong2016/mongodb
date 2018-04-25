const express = require("express");
const router = express.Router();

var User = require("../models/user.js");

router.get("/", (req, res, next) => {
  res.send("login");
  return next();
});

router.post("/submit", (req, res, next) => {
  // const user = new User({
  //   username: "admin",
  //   password: "admin"
  // });

  // // 添加
  // user.save(err => {
  //   console.log(`save status: ${err ? "failed" : "success"}`);
  // });

  // 查找
  User.find(
    {
      username: "admin",
      password: "admin"
    },
    (err, docs) => {
      if (err) {
        res.send("server or db error!");
        return next();
      }

      console.log(`登陆成功用户:\n ${docs}`);

      if (docs.length == 0) {
        res.send("用户名或密码错误!");
        return next();
      } else {
        res.send("login success");
        return next();
      }
    }
  );

  // 查找一条
  // User.findOne(
  //   {
  //     username: "admin",
  //     password: "admin"
  //   },
  //   (err, docs) => {
  //     if (err) {
  //       res.send("server or db error!");
  //       return next();
  //     }

  //     if (docs == null) {
  //       res.send("用户名或密码有误");
  //       return next();
  //     } else {
  //       req.session.user = {
  //         _id: docs._id,
  //         username: docs.username
  //       };
  //       res.send(JSON.stringify("login success"));
  //       return next();
  //     }
  //   }
  // );
});

module.exports = router;
