const express = require('express');
const {
  addComment,
  deleteComment,
} = require('../../../controllers/kanban/comment');
const authMiddleware = require('../../../middleware/auth');

const router = express.Router();

router.put('/comment/:taskId', authMiddleware, addComment);
router.delete('/comment/:taskId', authMiddleware, deleteComment);

module.exports = router;
