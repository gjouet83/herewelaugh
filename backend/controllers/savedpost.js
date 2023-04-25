const db = require('../models/index');

exports.getSavedPosts = (req, res, next) => {
  db.SavedPost.findAll({
    include: [
      {
        model: db.User,
        attributes: ['username', 'avatar'],
      },
      {
        model: db.Post,
        attributes: ['content', 'attachment'],
      },
    ],
  })
    .then((savedPosts) => {
      res.status(200).json(savedPosts);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getSavedPostsByUser = (req, res, next) => {
  db.SavedPost.findOne({
    where: { postId: req.query.postId, userId: req.query.userId },
  })
    .then((savedPosts) => {
      res.status(200).json(savedPosts);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.savePost = (req, res, next) => {
  db.SavedPost.findOne({
    where: { postId: req.body.postId, userId: req.body.userId },
  }).then((exist) => {
    if (exist) {
      return res.status(200).json({ exist });
    }
    const newSavedPost = {
      userId: req.body.userId,
      postId: req.body.postId,
    };
    db.SavedPost.create({ ...newSavedPost })
      .then(() => {
        res.status(201).json({ message: 'Post saved successful' });
      })
      .catch(() => {
        res.status(400).json({ error: 'Fail to save post' });
      });
  });
};

exports.deleteSavedPost = (req, res, next) => {
  db.SavedPost.findOne({
    where: { postId: req.query.postId, userId: req.query.userId },
  })
    .then((savedPost) => {
      if (!savedPost) {
        return res.status(404).json({ error: 'Saved Post not found' });
      }
      if (!req.auth.admin && savedPost.userId !== req.auth.userId) {
        return res.status(403).json({ error: 'User not allowed' });
      }
      savedPost
        .destroy()
        .then(() => {
          res.status(200).json({ message: 'Saved Post deleted successful' });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
