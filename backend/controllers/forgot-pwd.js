const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const CryptoJS = require('crypto-js');
const nodemailer = require('nodemailer');

const key = CryptoJS.enc.Hex.parse(process.env.KEY);
const iv = CryptoJS.enc.Hex.parse(process.env.IV);

exports.sendMail = (req, res, next) => {
  db.User.findOne({
    where: {
      email: CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString(),
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ errorMail: 'User unregistred' });
      }
      const token = jwt.sign(
        {
          key: CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString(),
        },
        process.env.FORGOTPWD_TOKEN,
        { expiresIn: '900s' }
      );
      const transporter = nodemailer.createTransport({
        name: process.env.SERVER_MAIL_NAME,
        host: process.env.SERVER_MAIL_HOST,
        port: process.env.SERVER_MAIL_PORT,
        secure: true,
        auth: {
          user: process.env.LOGIN_SERVER_MAIL,
          pass: process.env.PWD_SERVER_MAIL,
        },
      });
      let message = {
        from: {
          address: 'noreply@herewelaugh.com',
        },
        to: req.body.email,
        attachments: [
          {
            filename: 'Logonew_bleu.webp',
            path: `${req.protocol}://${req.get(
              'host'
            )}/medias/Logonew_bleu.webp`,
            cid: 'logo@herewelaugh',
          },
        ],

        subject: 'Demande de réinitialisation de mot de passe',

        html: `<header style="display:flex; 
        position:relative; 
        justify-content:center; 
        align-item:center; 
        line-height: 20px; 
        height:40px; 
        width:100vw;
        border-radius:10px; 
        background-color:#0395a0;">
        <img style="position:absolute; 
        left:10px; 
        "src="cid:logo@herewelaugh"; 
        height=40px; 
        width=40px; 
        alt="Smiley qui pleure de rire";
        />
        <h1 style="font-size:14px;
        margin-left:10px; 
        text-shadow: 0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white,
        0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white,
        0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white,
        0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white,
        0 0 2px white;">
        Réinitialisation du mot de passe
        </h1>
        </header>
          <p style="font-size:14px;margin-top:40px;">
          Une demande de réinitialisation de mot de passe a été envoyée pour votre compte
          </p>
          <p style="font-size:14px; text-align:center;margin-top:40px;">
          <b>Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail</b>
          </p>
          <p style="font-size:14px;margin-top:40px;">
          Pour réinitialiser votre mot de passe : 
          </p>
        <p style="text-align:center;">
        <a style="color: #0395a0; font-size:14px;" href=${
          req.protocol
        }://${req.get(
          'host'
        )}/forgotPwd/reset?token=${token}>Cliquez ici pour réinitialiser votre mot de passe</a>
        </p>`,
      };
      transporter.sendMail(message, (error) => {
        if (error) {
          console.log('Error occurred');
          console.log(error.message);
          return process.exit(1);
        }
        res.status(200).json({ messageMail: 'Message sent successfully!' });

        // only needed when using pooled connections
        transporter.close();
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.updateForgotPwd = (req, res, next) => {
  db.User.findOne({
    where: { email: req.auth.email },
  })
    .then((user) => {
      console.log(req.body.password);
      if (!user) {
        return res.status(401).json({ errorMail: 'user unregistred' });
      }
      bcrypt
        // on hash le mot de passe
        .hash(req.body.password, 10)
        .then((hash) => {
          db.User.update(
            {
              password: hash,
            },
            { where: { id: user.id } }
          ).then(() => {
            res.status(200).json({ message: 'Password updated successful' });
          });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
