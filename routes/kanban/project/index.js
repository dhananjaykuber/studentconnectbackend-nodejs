const express = require('express');
const {
  getProjects,
  createProject,
  getProject,
} = require('../../../controllers/kanban/project');
const authMiddleware = require('../../../middleware/auth');

const router = express.Router();

router.get('/project', authMiddleware, getProjects);
router.post('/project', authMiddleware, createProject);
router.get('/project/:projectId', authMiddleware, getProject);

module.exports = router;
