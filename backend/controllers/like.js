const db = require('../models/index');
const Sequelize = require('sequelize');

//on récupère les likes
exports.getLikes = (req, res, next) => {
  db.Like.findAll({
    attributes: [
      //on fait la somme des likes
      [Sequelize.fn('sum', Sequelize.col('like')), 'sumLikes'],
    ],
    where: { postId: req.query.postId },
  })
    .then((likes) => {
      res.status(200).json(likes);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.createLike = (req, res, next) => {
  db.Like.findOne({
    where: { postId: req.body.postId, userId: req.auth.userId },
  }).then((exist) => {
    if (exist) {
      return res.status(200).json({ exist });
    }
    db.Like.create({
      ...req.body,
      userId: req.auth.userId,
      like: 1,
    })
      .then(() => {
        res.status(201).json({ message: 'liked' });
      })
      .catch(() => {
        res.status(400).json({ error: 'like failed' });
      });
  });
};

exports.updateLike = (req, res, next) => {
  db.Like.findOne({
    where: {
      postId: req.body.postId,
      userId: req.auth.userId,
    },
  })
    .then((like) => {
      if (!like) {
        return res.status(404).json({ error: 'like not found' });
      }
      db.Like.update(
        {
          ...req.body,
        },
        {
          where: {
            id: req.params.like_id,
            userId: req.auth.userId,
            postId: req.body.postId,
          },
        }
      )
        .then(() => {
          res.status(200).json({ message: 'like updated' });
        })
        .catch(() => {
          res.status(500).json({ error: 'failed to update like' });
        });
    })
    .catch(() => {
      res.status(500).json({ error: 'failed to update like' });
    });
};
