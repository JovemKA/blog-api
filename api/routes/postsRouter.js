const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPostBySlug, updatePost, deletePost } = require('../controllers/postsController');

router.post('/', createPost);
router.get('/', getPosts);
router.get('/:slug', getPostBySlug);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;    