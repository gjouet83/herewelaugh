const express = require('express');
const savedPostCtrl = require('../controllers/savedpost');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth.regularReq, savedPostCtrl.getSavedPosts);

router.get('/user', auth.regularReq, savedPostCtrl.getSavedPostsByUser);

router.post('/', auth.regularReq, savedPostCtrl.savePost);

router.delete('/:savedPost_id', auth.regularReq, savedPostCtrl.deleteSavedPost);

module.exports = router;
