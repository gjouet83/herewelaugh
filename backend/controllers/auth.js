const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const CryptoJS = require('crypto-js');
const fs = require('fs');

//personnalisation de KEY et IV pour la comparaison lors du login
const key = CryptoJS.enc.Hex.parse(process.env.KEY);
const iv = CryptoJS.enc.Hex.parse(process.env.IV);

exports.signup = (req, res, next) => {
  bcrypt
    // on hash le mot de passe
    .hash(req.body.password, 10)
    .then((hash) => {
      //on crée un user en cryptant le mail et en ajoutant le hash
      db.User.create({
        username: req.body.username,
        email: CryptoJS.AES.encrypt(req.body.email, key, {
          iv: iv,
        }).toString(),
        password: hash,
        avatar: `${req.protocol}://${req.get('host')}/medias/user-solid.svg`,
      })
        .then(() => {
          res.status(201).json({ message: 'user created successful' });
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

exports.login = (req, res, next) => {
  //on cherche le user avec le même email crypté
  db.User.findOne({
    where: {
      email: CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString(),
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ errorMail: 'user unregistred' });
      }
      bcrypt
        //on compare le hash du password
        .compare(req.body.password, user.password)
        .then((passwordOk) => {
          if (!passwordOk) {
            return res.status(401).json({ errorPassword: 'Wrong password' });
          }
          // creation d'un dossier user contenant touts ses photos
          const filename = 'userId-' + user.id;
          fs.mkdir(`medias/${filename}`, () => {
            res.status(200).json({
              userId: user.id,
              admin: user.admin,
              // on crée un token contenant le userId et admin (true, false)
              token: jwt.sign(
                { userId: user.id, admin: user.admin },
                process.env.USER_TOKEN,
                { expiresIn: '12h' }
              ),
            });
          });
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

exports.updateLogin = (req, res, next) => {
  db.User.findOne({
    where: {
      email: CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString(),
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'User unregistred' });
      }
      if (!req.auth.admin && user.userId !== req.auth.userId) {
        return res.status(403).json({ error: 'User not allowed' });
      }
      db.User.update(
        {
          email: CryptoJS.AES.encrypt(req.body.newEmail, key, {
            iv: iv,
          }).toString(),
        },
        { where: { id: req.auth.userId } }
      )
        .then(() => {
          res.status(200).json({ message: 'Email updated successful' });
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

exports.updatePassword = (req, res, next) => {
  db.User.findOne({ where: { id: req.params.userId } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'User unregistred' });
      }
      if (!req.auth.admin && user.userId !== req.auth.userId) {
        return res.status(403).json({ error: 'User not allowed' });
      }
      bcrypt
        //on compare le hash du password
        .compare(req.body.password, user.password)
        .then((passwordOk) => {
          if (!passwordOk) {
            return res.status(401).json({ error: 'Wrong password' });
          }
          bcrypt
            // on hash le mot de passe
            .hash(req.body.newPassword, 10)
            .then((hash) => {
              db.User.update(
                {
                  password: hash,
                },
                { where: { id: req.auth.userId } }
              ).then(() => {
                res
                  .status(200)
                  .json({ message: 'Password updated successful' });
              });
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
