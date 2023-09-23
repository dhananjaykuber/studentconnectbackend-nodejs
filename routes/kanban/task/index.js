const express = require('express');
const {
  createTask,
  updateTask,
  deleteTask,
  moveTask,
} = require('../../../controllers/kanban/task');
const authMiddleware = require('../../../middleware/auth');

const router = express.Router();

router.post('/task/:stageId', authMiddleware, createTask);
router.put('/task/:taskId', authMiddleware, updateTask);
router.delete('/task/:taskId', authMiddleware, deleteTask);
router.put('/move-task/:taskId', authMiddleware, moveTask);

module.exports = router;
