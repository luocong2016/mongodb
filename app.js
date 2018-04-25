#!/usr/bin/env node

const path = require("path");
const express = require("express");
const logger = require("morgan");
const favicon = require("serve-favicon");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");

const config = require("./config/config.js");
const mongoose = require("./config/mongoose.js");

/* routers import */
const login = require("./routes/login.js");
const db = mongoose();

const app = express();

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser("session-common-id"));
app.use(
  session({
    name: "session-common-id",
    secret: "session-common-id",
    store: new mongoStore({
      url: config.mongodb,
      collection: "sessions",
      ttl:10, // session过期时间
      autoRemoveInterval: 10,
      touchAfter: 24 * 3600
    }),
    cookie: { maxAge: 60 * 1000 * 30 }, //设置maxAge失效过期 30分钟
    resave: false, // 是否每次都重新保存会话，建议false
    saveUninitialized: false // 是否自动保存未初始化的会话，建议false
  })
);

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT,POST,GET,PATCH,HEAD,DELETE,OPTIONS"
  );
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

/* routers */
app.use("/login", login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  res.send("error");
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
