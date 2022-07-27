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
        attributes: ['content', 'attachment', ['username', 'PostUsername']],
      },
    ],
  })
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.savePost = (req, res, next) => {
  const newSavedPost = {
    userId: req.body.userId,
    postId: req.body.postId,
  };
  db.SavedPost.create({ ...newSavedPost })
    .then(() => {
      res.status(200).json({ message: 'Post saved successful' });
    })
    .catch(() => {
      res.status(400).json({ error: 'Fail to save post' });
    });
};

exports.deleteSavedPost = (req, res, next) => {
  db.SavedPost.findOne({ where: { id: req.query.id } })
    .then((savedPost) => {
      if (!savedPost) {
        return res.status(404).json({ error: 'Saved Post not found' });
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
