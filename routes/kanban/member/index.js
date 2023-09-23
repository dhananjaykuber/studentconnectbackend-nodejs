const express = require('express');
const {
  addMember,
  removeMember,
} = require('../../../controllers/kanban/member');
const authMiddleware = require('../../../middleware/auth');

const router = express.Router();

router.post('/member/:projectId', authMiddleware, addMember);
router.delete('/member/:projectId', authMiddleware, removeMember);

module.exports = router;
