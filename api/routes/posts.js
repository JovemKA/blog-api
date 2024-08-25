const express = require('express');
const { validatePost } = require('../middlewares/validation');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/', postController.getPosts);
router.get('/:slug', postController.getPostBySlug);
router.post('/', validatePost, postController.createPost);
router.put('/:id', validatePost, postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
