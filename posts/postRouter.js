const express = 'express';
const db = require("../posts/postDb.js")
const router = express.Router();

router.get('/', (req, res) => {
  db.get()
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(err) => {
    res.status(500).json({message: "Post information could not be retrieved."})
  }
});

router.get('/:id', (req, res) => {
  db.getById(req.params.id)
  .then(post => {
    if(post.length === 0) {
      res.status(404).json({message: "The post with the specified ID does not exist."})
    } else {
      res.status(200).json(post);
    }
  })
  .catch(err) => {
    res.status(500).json({message: "Post information could not be retrieved."})
  }
});

router.delete('/:id', (req, res) => {
  const post = req.body;
  
  if(!post.body.title || !post.body.contents) {
    res.status(400).json({message: "Please provide title and contents for the post."})
  }
  db.insert(post)
  .then(newPost => {
    res.status(201).json(newPost)
  })
  .catch(err) => {
    res.status(500).json({message: "There was an error while saving the post to the database."})
  }
});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;