const express = require('express');
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const validateInputs = require('../middleware/validateinputs');
const multer = require('../middleware/multer-avatar');

const router = express.router();

router.get('/', auth, userCtrl.getUsers);
router.get('/:userId', auth, userCtrl.getUser);

router.put(
  '/:userId',
  auth,
  multer,
  validateInputs.profil,
  userCtrl.updateProfil
);
router.put('/:userId/avatar', auth, multer, userCtrl.deleteAvatar);

router.delete('/:userId', auth, userCtrl.deleteUser);

module.exports = router;
