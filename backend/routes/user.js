const express = require('express');
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const validateInputs = require('../middleware/validateinputs');
const multer = require('../middleware/multer');

const router = express.router();

router.get('/get', auth, userCtrl.getUsers);
router.get('/get/:id', auth, userCtrl.getUser);

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
