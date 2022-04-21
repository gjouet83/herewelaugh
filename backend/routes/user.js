const express = require('express');
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const validateInputs = require('../middleware/validateinputs');
const multer = require('../middleware/multer');

const router = express.router();

router.get('/get', auth, userCtrl.getUsers);
router.get('/get/:id', auth, userCtrl.getUser);
router.post(
  '/signup',
  validateInputs.username,
  validateInputs.email,
  validateInputs.password,
  userCtrl.signup
);
router.post(
  '/login',
  validateInputs.email,
  validateInputs.password,
  userCtrl.login
);
router.put(
  '/update/login/:id',
  auth,
  validateInputs.email,
  userCtrl.updateLogin
);
router.put(
  '/update/password/:id',
  auth,
  validateInputs.password,
  userCtrl.updatePassword
);
router.put(
  '/update/profile/username/:id',
  auth,
  validateInputs.username,
  userCtrl.updateUserProfile
);
router.put(
  '/update/profile/describ/:id',
  auth,
  validateInputs.username,
  userCtrl.updateUserProfile
);
router.put(
  '/update/profile/avatar/:id',
  auth,
  multer,
  validateInputs.username,
  userCtrl.updateUserProfile
);

router.delete('/delete/:id', auth, userCtrl.deleteUserAccount);

module.exports = router;
