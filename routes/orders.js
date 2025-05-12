const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createOrder,
  getOrders,
  getOrderById,
  updateDeliveryStatus
} = require('../controllers/orderController');

// Protected routes
router.post('/', auth, createOrder);
router.get('/', auth, getOrders);
router.get('/:id', auth, getOrderById);
router.put('/:id/delivery', auth, updateDeliveryStatus);

module.exports = router; 