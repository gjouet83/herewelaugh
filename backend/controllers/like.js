const db = require('../models/index');
const Sequelize = require('sequelize');

//on récupère les likes
exports.getLikes = (req, res, next) => {
  db.Like
    .findAll({
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
