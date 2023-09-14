const express = require('express');
const {
  getUsers,
  getProjects,
  getProjectById,
  createProject,
  addMember,
  removeMember,
  createStage,
  createTask,
} = require('../controllers/kanbanController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// get all users --> /api/kanban/users
router.get('/users', getUsers);

// get all projects --> /api/kanban/project
router.get('/project', authMiddleware, getProjects);

// get single projects --> /api/kanban/project/:projectId
router.get('/project/:projectId', authMiddleware, getProjectById);

// create new project --> /api/kanban/project
router.post('/project', authMiddleware, createProject);

// add member to project --> /api/kanban/project/:projectId/members
router.post(`/project/:projectId/members`, addMember);

// remove member from project --> /api/kanban/project/:projectId/members
router.delete(`/project/:projectId/members`, removeMember);

// create new project stage --> /api/kanban/project/:projectId/stage
router.post('/project/:projectId/stage', createStage);

// create new task --> /api/kanban/stage/:stageId/task
router.post('/stage/:stageId/task', createTask);

module.exports = router;
