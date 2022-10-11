const express = require('express');
const likeCtrl = require('../controllers/like');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', likeCtrl.getLikes);

router.post('/', auth.regularReq, likeCtrl.createLike);

router.put('/:like_id', auth.regularReq, likeCtrl.updateLike);

module.exports = router;
