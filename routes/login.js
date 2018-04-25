const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

router.use((req, res, next) => {
  console.log(req.headers.cookie);
  console.info(req.cookies);
  console.log(req.session);
  next();
});

router.get("/", (req, res, next) => {
  res.json("login");
});

router.get("/l", (req, res, next) => {
  res.json("login2");
});

router.post("/submit", (req, res, next) => {
  // const user = new User({
  //   username: "admin",
  //   password: "admin"
  // });

  // 添加
  // user.save(err => {
  //   console.log(`save status: ${err ? "failed" : "success"}`);
  // });

  // 查找
  // User.find(
  //   {
  //     username: "admin",
  //     password: "admin"
  //   },
  //   (err, docs) => {
  //     if (err) {
  //       res.json("server or db error!");
  //     }

  //     console.log(`登陆成功用户:\n ${docs}`);

  //     if (docs.length == 0) {
  //       res.json("用户名或密码错误!");
  //     } else {
  //       res.json("login success");
  //     }
  //   }
  // );

  // 查找一条
  User.findOne(
    {
      username: "admin",
      password: "admin"
    },
    (err, docs) => {
      if (err) {
        res.json("server or db error!");
        return;
      }

      if (docs == null) {
        res.json("用户名或密码有误");
      } else {
        req.session.user = {
          _id: docs._id,
          username: docs.username
        };
        res.json("login success");
      }
    }
  );
});

module.exports = router;
