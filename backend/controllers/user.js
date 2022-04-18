const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const CryptoJS = require('crypto-js');
const fs = require('fs');

//personnalisation de KEY et IV pour la comparaison lors du login
const key = CryptoJS.enc.Hex.parse(process.env.KEY);
const iv = CryptoJS.enc.Hex.parse(process.env.IV);
