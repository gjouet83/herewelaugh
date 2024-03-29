const db = require('../models/index');
const fs = require('fs');

exports.getUsers = (req, res, next) => {
  db.User.findAll()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getUser = (req, res, next) => {
  db.User.findOne({ where: { id: req.params.user_id } })
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.updateProfil = (req, res, next) => {
  db.User.findOne({ where: { id: req.params.user_id } })
    .then((user) => {
      if (!req.auth.admin && user.id !== req.auth.userId) {
        return res.status(403).json({ error: 'User not allowed' });
      }
      const updatedProfil = req.file
        ? {
            ...req.body,
            avatar: `${req.protocol}://${req.get('host')}/medias/userId-${
              req.params.user_id
            }/${req.file.filename}`,
          }
        : { ...req.body };
      db.User.update(
        { ...updatedProfil },
        { where: { id: req.params.user_id } }
      )
        .then(() => {
          res.status(200).json({ message: 'Profil updated successful' });
        })
        .catch((error) => {
          res
            .status(400)
            .json({ errno: error.parent.errno, errField: error.fields });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.deleteAvatar = (req, res, next) => {
  db.User.findOne({ where: { id: req.params.user_id } })
    .then((user) => {
      if (!req.auth.admin && user.id !== req.auth.userId) {
        return res.status(403).json({ error: 'User not allowed' });
      }
      db.User.update(
        {
          avatar: `${req.protocol}://${req.get('host')}/medias/user-solid.svg`,
        },
        { where: { id: req.params.user_id } }
      )
        .then(() => {
          res.status(200).json({ message: 'Profil updated successful' });
        })
        .catch(() => {
          res.status(400).json({ error: 'Profil update failed' });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//on supprime un utilisateur
exports.deleteUser = (req, res, next) => {
  db.User.findOne({ where: { id: req.params.user_id } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (!req.auth.admin && user.id !== req.auth.userId) {
        return res.status(403).json({ error: 'User not allowed' });
      }
      //on supprime le dossier du user correspondant
      const filename = 'userId-' + user.id;
      fs.rm(`medias/${filename}`, { recursive: true }, () => {
        user
          .destroy()
          .then(() => {
            res.status(200).json({ message: 'Account deleted successful' });
          })
          .catch((error) => {
            res.status(400).json({ error });
          });
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
