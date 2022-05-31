const express = require('express');
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const validateInputs = require('../middleware/validateinputs');
const multer = require('../middleware/multer-avatar');

const router = express.router();

router.get('/get', auth, userCtrl.getUsers);
router.get('/get/:id', auth, userCtrl.getUser);

router.put(
  '/update/:id',
  auth,
  multer,
  validateInputs.profil,
  userCtrl.updateProfil
);
router.put('/update/avatar/:id', auth, multer, userCtrl.deleteAvatar);

router.delete('/delete/:id', auth, userCtrl.deleteUser);

module.exports = router;
