const express = require('express');
const router = express.Router();
const { auth, isInfluencer } = require('../middleware/auth');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected routes
router.post('/', auth, isInfluencer, createProduct);
router.put('/:id', auth, isInfluencer, updateProduct);
router.delete('/:id', auth, isInfluencer, deleteProduct);

module.exports = router; 