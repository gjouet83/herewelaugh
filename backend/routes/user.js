const express = require('express');
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const validateInputs = require('../middleware/validateinputs');
const multer = require('../middleware/multer-config');

const router = express.Router();

router.get('/', auth.regularReq, userCtrl.getUsers);
router.get('/:user_id', auth.regularReq, userCtrl.getUser);

router.put(
  '/:user_id',
  auth.regularReq,
  multer.avatar,
  validateInputs.profil,
  userCtrl.updateProfil
);
router.put(
  '/:user_id/avatar',
  auth.regularReq,
  multer.avatar,
  userCtrl.deleteAvatar
);

router.delete('/:user_id', auth.regularReq, userCtrl.deleteUser);

module.exports = router;
