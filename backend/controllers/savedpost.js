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
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
