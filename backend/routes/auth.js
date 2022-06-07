const express = require('express');
const authCtrl = require('../controllers/auth');
const validateInputs = require('../middleware/validateinputs');

const router = express.Router();

router.post(
  '/signup',
  validateInputs.username,
  validateInputs.email,
  validateInputs.password,
  authCtrl.signup
);
router.post(
  '/login',
  validateInputs.email,
  validateInputs.password,
  authCtrl.login
);

router.put(
  '/login/:userId',
  auth,
  validateInputs.email,
  validateInputs.newEmail,
  authCtrl.updateLogin
);
router.put(
  '/password/:userId',
  auth,
  validateInputs.password,
  validateInputs.newPassword,
  authCtrl.updatePassword
);

module.exports = router;
