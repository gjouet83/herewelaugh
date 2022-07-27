const express = require('express');
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const validateInputs = require('../middleware/validateinputs');
const multer = require('../middleware/multer-post');

const router = express.Router();

router.get('/', postCtrl.getPosts);
router.get('/order=asc', postCtrl.getPostsSortByMostOld);
router.get('/sort=rate&order=desc', postCtrl.getPostsSortByRate);
router.get('/:user_id', auth, postCtrl.getPostsByUser);
router.get('/search/:keywords', validateInputs.content, postCtrl.searchPost);

router.post('/', auth, multer, validateInputs.content, postCtrl.createPost);

router.put(
  '/:post_id',
  auth,
  multer,
  validateInputs.content,
  postCtrl.updatePost
);

router.delete('/:post_id', auth, postCtrl.deletePost);

module.exports = router;
