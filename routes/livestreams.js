const express = require('express');
const router = express.Router();
const { auth, isInfluencer } = require('../middleware/auth');
const {
  createStream,
  getStreams,
  getStreamById,
  updateStreamStatus,
  addViewer,
  addChatMessage
} = require('../controllers/livestreamController');

// Public routes
router.get('/', getStreams);
router.get('/:id', getStreamById);

// Protected routes
router.post('/', auth, isInfluencer, createStream);
router.put('/:id/status', auth, isInfluencer, updateStreamStatus);
router.post('/:id/viewer', auth, addViewer);
router.post('/:id/chat', auth, addChatMessage);

module.exports = router; 