const { Sequelize } = require('sequelize');
const express = require('express');
const path = require('path');
const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const savedPostRoutes = require('./routes/savedpost');
const likeRoutes = require('./routes/like');
const forgotPwdRoutes = require('./routes/forgot-pwd');

const app = express();

const sequelize = new Sequelize(
  'herewelaugh-dev',
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connexion à la base de données: SUCCES !');
  })
  .catch((err) => {
    console.log('Connexion à la base de données: ECHEC ', err);
  });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(express.json());
app.use(helmet());

app.use('/medias', express.static(path.join(__dirname, 'medias')));
app.use('/api/auth', authRoutes);
app.use('/api/forgot-pwd', forgotPwdRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/savedposts', savedPostRoutes);
app.use('/api/likes', likeRoutes);

module.exports = app;
