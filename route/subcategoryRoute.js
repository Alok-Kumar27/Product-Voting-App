// backend/routes/subcategoryRoutes.js
const express = require('express');
const router = express.Router();
const subcategoryController = require('../controller/subcategorycontroller');
const upload = require('../Middleware/upload');
const protect = require('../Middleware/auth');


router.use(protect);
router.post('/', protect, upload.single('image'), subcategoryController.createSubcategory);
router.get('/', protect, subcategoryController.getSubcategories);
router.put('/:id', protect, upload.single('image'), subcategoryController.updateSubcategory);
router.delete('/:id', protect, subcategoryController.deleteSubcategory);

module.exports = router;
