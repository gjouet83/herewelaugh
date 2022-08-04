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
  db.like
    .findOne({ where: { postId: req.body.postId, userId: req.body.userId } })
    .then((exist) => {
      if (exist) {
        return res.status(400).json({ exist });
      } else {
        db.Like.create({ ...req.body })
          .then(() => {
            res.status(201).json({ message: 'liked' });
          })
          .catch(() => {
            res.status(400).json({ error: 'failed to create like' });
          });
      }
    });
};

exports.updateLike = (req, res, next) => {
  db.Like.update({
    ...req.body.like,
    where: {
      id: req.query.likeId,
      postId: req.body.postId,
      userId: req.body.userId,
    },
  })
    .then(() => {
      res.status(200).json({ message: 'like updated' });
    })
    .catch(() => {
      res.status(400).json({ error: 'failed to update like' });
    });
};
