const express = require('express');
const {
  getNotifications,
  updateNotification,
  deleteNotification,
} = require('../../../controllers/kanban/notification');
const authMiddleware = require('../../../middleware/auth');

const router = express.Router();

router.get('/notification/:projectId', authMiddleware, getNotifications);
router.put('/notification/:notificationId', authMiddleware, updateNotification);
router.delete(
  '/notification/:notificationId',
  authMiddleware,
  deleteNotification
);

module.exports = router;
