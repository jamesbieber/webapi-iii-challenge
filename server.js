const express = require("express");
const helmet = require("helmet");

const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter.js");

const server = express();

server.use(express.json());
server.use(helmet);
server.use(logger("dev"));

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request, ${req.url}, at ${Date.now()} `);
  next();
}

server.use((err, req, res, next) => {
  res.status(500).json({
    message: "Bad error",
    err
  });
});

server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

module.exports = server;
