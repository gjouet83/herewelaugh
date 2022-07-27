const express = require('express');
const savedPostCtrl = require('../controllers/savedpost');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, savedPostCtrl.getSavedPosts);

router.post('/', auth, savedPostCtrl.savePost);

router.delete('/:id', auth, savedPostCtrl.deleteSavedPost);

module.exports = router;
