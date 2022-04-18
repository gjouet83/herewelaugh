const express = require('express');
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const validate = require('../middleware/validateinputs');
const multer = require('../middleware/multer');

const router = express.router();
