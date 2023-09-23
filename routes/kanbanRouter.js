const express = require('express');
const {
  getUsers,
  getProjects,
  getProjectById,
  createProject,
  addMember,
  removeMember,
  createStage,
  updateStage,
  createTask,
  updateTask,
  deleteTask,
  moveTask,
  addComment,
  deleteComment,
  getNotifications,
  updateNotification,
  deleteNotification,
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
router.post(`/project/:projectId/members`, authMiddleware, addMember);

// remove member from project --> /api/kanban/project/:projectId/members
router.delete(`/project/:projectId/members`, authMiddleware, removeMember);

// create new project stage --> /api/kanban/project/:projectId/stage
router.post('/project/:projectId/stage', authMiddleware, createStage);

// update project stage --> /api/kanban/project/:projectId/stage/:stageId
router.put('/project/:projectId/stage/:stageId', authMiddleware, updateStage);

// create new task --> /api/kanban/stage/:stageId/task
router.post('/stage/:stageId/task', authMiddleware, createTask);

// add new comment --> /api/kanban/:taskId/comment
router.put('/task/:taskId/comment', authMiddleware, addComment);

// delete comment --> /api/kanban/:taskId/comment
router.delete(
  '/task/:taskId/comment/:commentId',
  authMiddleware,
  deleteComment
);

// update task --> /api/kanban/task/:taskId
router.put('/task/:taskId', authMiddleware, updateTask);

// delete task --> /api/kanban/task/:taskId
router.delete('/task/:taskId', authMiddleware, deleteTask);

// move task
router.put('/move-task/:taskId', authMiddleware, moveTask);

// get all notifications
router.get('/notification/:projectId', authMiddleware, getNotifications);

// update notification status
router.put('/notification/:notificationId', authMiddleware, updateNotification);

// delete notification
router.delete(
  '/notification/:notificationId',
  authMiddleware,
  deleteNotification
);

module.exports = router;
