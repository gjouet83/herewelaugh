const express = require('express');
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const validateInputs = require('../middleware/validateinputs');
const multer = require('../middleware/multer-config');

const router = express.Router();

router.get('/', auth, userCtrl.getUsers);
router.get('/:user_id', auth, userCtrl.getUser);

router.put(
  '/:user_id',
  auth,
  multer.avatar,
  validateInputs.profil,
  userCtrl.updateProfil
);
router.put('/:user_id/avatar', auth, multer.avatar, userCtrl.deleteAvatar);

router.delete('/:user_id', auth, userCtrl.deleteUser);

module.exports = router;
