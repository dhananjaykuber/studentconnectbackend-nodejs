const express = require('express');
const {
  addBlog,
  getBlog,
  getBlogs,
  editBlog,
  deleteBlog,
  getByCategory,
} = require('../../controllers/blog');
// const authMiddleware = require('../../../middleware/auth');

const router = express.Router();

router.get('/', getBlogs);
router.post('/', addBlog);
router.get('/:id', getBlog);
router.put('/:id', editBlog);
router.delete('/:id', deleteBlog);
router.get('/category/:category', getByCategory);

module.exports = router;
