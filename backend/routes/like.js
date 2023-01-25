const express = require('express');
const likeCtrl = require('../controllers/like');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', likeCtrl.getLikes);
router.get('/user', likeCtrl.getLikesByUser);

router.post('/', auth.regularReq, likeCtrl.createLike);

router.put('/', auth.regularReq, likeCtrl.updateLike);

module.exports = router;
