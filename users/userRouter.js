const express = "express";
const db = require("../posts/postDb.js");

const router = express.Router();

router.post("/", (req, res) => {
  const user = req.body;

  if (!user.name) {
    res.status(400).json({ message: "Please provide name for the user" });
  }
  db.insert(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message: "There was an error while saving the user to the database."
        });
    });
});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {
  db.getById(req.params.id)
    .then(user => {
      if (user.length === 0) {
        res
          .status(404)
          .json({ message: "User with specified ID does not exist." });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  db.getById(req.params.id)
    .then(user => {
      if (user.length === 0) {
        res
          .status(404)
          .json({ message: "User with specified ID does not exist." });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved." });
    });
});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      if (!count) {
        res
          .status(404)
          .json({ message: "User with the specified ID does not exist." });
      } else {
        res.status(201).json({ message: "User has been deleted." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "User could not be removed." });
    });
});

router.put("/:id", (req, res) => {
  const update = req.body;

  if (!update.name) {
    res.status(400).json({ message: "Please provide name for user" });
  }
  db.update(req.params.id, update)
    .then(count => {
      if (!count) {
        res
          .status(404)
          .json({ message: "User with specified ID does not exist." });
      } else {
        res.status(200).json(update);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "User information could not be updated." });
    });
});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
