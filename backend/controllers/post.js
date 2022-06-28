const db = require('../models/index');
const { Op } = require('sequelize');
const fs = require('fs');

exports.getPosts = (req, res, next) => {
  db.Post.findAll({
    include: [
      {
        model: db.User,
        attributes: ['username', 'avatar'],
      },
      {
        model: db.Rate,
        attributes: ['like', 'dislike'],
      },
    ],
    order: [['createdAt', 'DESC']],
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.satus(500).json({ error });
    });
};

exports.getPostsSortByMostOld = (req, res, next) => {
  db.Post.findAll({
    include: [
      {
        model: db.User,
        attributes: ['username', 'avatar'],
      },
      {
        model: db.Rate,
        attributes: ['like', 'dislike'],
      },
    ],
    order: [['createdAt', 'ASC']],
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.satus(500).json({ error });
    });
};

exports.getPostsSortByRate = (req, res, next) => {
  db.Post.findAll({
    include: [
      {
        model: db.User,
        attributes: ['username', 'avatar'],
      },
      {
        model: db.Rate,
        attributes: ['like', 'dislike'],
      },
    ],
    order: [['like', 'DESC']],
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getPostsByUser = (req, res, next) => {
  db.Post.findAll({
    include: [
      {
        model: db.User,
        attributes: ['username', 'avatar'],
      },
    ],
    where: { userId: req.query.userId },
    order: [['createdAt', 'DESC']],
  })
    .then((posts) => {
      if (!posts) {
        return res.status(404).json({ error: 'posts non trouvés' });
      }
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.searchPost = (req, res, next) => {
  db.Post.findAll({
    include: [
      {
        model: db.User,
        attributes: ['username'],
      },
      {
        model: db.Post,
        attributes: ['content'],
      },
    ],
    where: {
      username: { [Op.like]: `%${req.query}%` },
      content: { [Op.like]: `%${req.query}%` },
    },
  })
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: 'posts non trouvés' });
      }
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.createPost = (req, res, next) => {
  const newPost = req.file
    ? {
        ...req.body,
        attachment: `${req.protocol}://${req.get('host')}/medias/userId-${
          req.body.userId
        }/${req.file.filename}`,
      }
    : {
        ...req.body,
      };
  db.Post.create({ ...newPost })
    .then(() => {
      res.status(200).json({ message: 'Post crée avec SUCCES !' });
    })
    .catch(() => {
      res.status(400).json({ error: 'ECHEC de la création du post' });
    });
};

exports.updatePost = (req, res, next) => {
  const updatedPost = req.file
    ? {
        ...req.body,
        attachment: `${req.protocol}://${req.get('host')}/medias/userId-${
          req.body.userId
        }/${req.file.filename}`,
      }
    : { ...req.body };
  db.Post.update({ ...updatedPost }, { where: { id: req.query.id } })
    .then(() => {
      res.status(200).json({ message: 'Post modifié avec SUCCES !' });
    })
    .catch(() => {
      res.status(400).json({ error: 'ECHEC de la modification du post' });
    });
};

exports.deletePost = (req, res, next) => {
  db.Post.findOne({ where: { id: req.query.id } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: 'Post non trouvé' });
      }
      //on supprime le fichier
      if (post.attachment) {
        const filename = post.attachment.split(
          `medias/userId-${req.body.userId}`
        )[1];
        fs.unlink(`medias/userId-${req.body.userId}/${filename}`, () => {
          console.log('image supprimée');
        });
      }
      post
        .destroy()
        .then(() => {
          res.status(200).json({ message: 'Post supprimé avec SUCCES !' });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
