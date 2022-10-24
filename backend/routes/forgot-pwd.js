const express = require('express');
const auth = require('../middleware/auth');
const validateInputs = require('../middleware/validateinputs');
const forgotPwdCtrl = require('../controllers/forgot-pwd');

const router = express.Router();

router.post('/sendMail', validateInputs.email, forgotPwdCtrl.sendMail);

router.put('/reset', auth.forgotPwdReq, forgotPwdCtrl.updateForgotPwd);
module.exports = router;
