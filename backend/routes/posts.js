const express = require('express');
const router = express.Router();
const { createPost, getPosts, getArticleById, updatePost, deletePost } = requite('../controllers/posts.js');

router.post('/', createPost);
router.get('/', getPosts);
router.get('/:id', getArticleById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;    