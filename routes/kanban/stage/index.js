const express = require('express');
const {
  createStage,
  updateStage,
} = require('../../../controllers/kanban/stage');
const authMiddleware = require('../../../middleware/auth');

const router = express.Router();

router.post('/stage/:projectId', authMiddleware, createStage);
router.put('/stage/:projectId/:stageId', authMiddleware, updateStage);

module.exports = router;
