const express = require('express');
const router = express.Router();
const { validatePost } = require('../middlewares/validation');
const postController = require('../controllers/postController');

router.post('/', validatePost, postController.createPost);
router.get('/', postController.getPosts);
router.get('/:slug', postController.getPostBySlug);
router.put('/:id', validatePost, postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
