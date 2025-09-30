// backend/routes/subcategoryRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const upload = require('../Middleware/upload');
const protect = require('../Middleware/auth');


router.use(protect);
router.post('/', protect, upload.single('image'), productController.createProduct);
router.get('/', protect, productController.getProducts);
router.put('/:id', protect, upload.single('image'), productController.updateProduct);
router.delete('/:id', protect, productController.deleteProduct);

module.exports = router;
