const express = require('express');
const likeCtrl = require('../controllers/like');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', likeCtrl.getLikes);

router.post('/', auth, likeCtrl.createLike);

router.put('/:like_id', auth, likeCtrl.updateLike);

module.exports = router;
