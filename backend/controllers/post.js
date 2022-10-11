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
        model: db.Like,
        attributes: ['like'],
      },
    ],
    order: [['createdAt', 'DESC']],
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({ error });
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
        model: db.Like,
        attributes: ['like'],
      },
    ],
    order: [['createdAt', 'ASC']],
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({ error });
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
        model: db.Like,
        attributes: ['like'],
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
    where: { userId: req.params.user_id },
    order: [['createdAt', 'DESC']],
  })
    .then((posts) => {
      if (!posts) {
        return res.status(404).json({ error: 'posts not found' });
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
    ],
    where: {
      [Op.or]: [
        { content: { [Op.like]: `%${req.params.keywords}%` } },
        { username: { [Op.like]: `%${req.params.keywords}%` } },
      ],
    },
  })
    .then((result) => {
      if (Object.keys(result).length === 0) {
        return res.status(404).json({ error: 'Nothing found' });
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
        userId: req.auth.userId,
        attachment: `${req.protocol}://${req.get('host')}/medias/userId-${
          req.auth.userId
        }/${req.file.filename}`,
      }
    : {
        ...req.body,
        userId: req.auth.userId,
      };
  db.Post.create({ ...newPost })
    .then(() => {
      res.status(201).json({ message: 'Post created successful' });
    })
    .catch(() => {
      res.status(400).json({ error: 'Fail to create post' });
    });
};

exports.updatePost = (req, res, next) => {
  db.Post.findOne({
    where: { id: req.params.post_id },
  })
    .then((post) => {
      if (!req.auth.admin && post.userId !== req.auth.userId) {
        return res.status(403).json({ error: 'User not allowed' });
      }
      const updatedPost = req.file
        ? {
            ...req.body,
            attachment: `${req.protocol}://${req.get('host')}/medias/userId-${
              post.userId
            }/${req.file.filename}`,
          }
        : { ...req.body };
      db.Post.update({ ...updatedPost }, { where: { id: req.params.post_id } })
        .then(() => {
          res.status(200).json({ message: 'Post updated successful' });
        })
        .catch(() => {
          res.status(400).json({ error: 'fail to update post' });
        });
    })
    .catch((error) => {
      res.status(400).json({ error: 'Post not found' });
    });
};

exports.deletePost = (req, res, next) => {
  db.Post.findOne({ where: { id: req.params.post_id } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      if (!req.auth.admin && post.userId !== req.auth.userId) {
        return res.status(403).json({ error: 'User not allowed' });
      }
      //on supprime le fichier
      if (post.attachment) {
        const filename = post.attachment.split(
          `medias/userId-${post.userId}`
        )[1];
        fs.unlink(`medias/userId-${post.userId}/${filename}`, () => {
          console.log('picture deleted');
        });
      }
      post
        .destroy()
        .then(() => {
          res.status(200).json({ message: 'Post deleted successful' });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
