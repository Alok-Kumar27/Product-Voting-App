const express=require('express');
const router=express.Router();
const categoryController=require('../controller/categoryController');
const upload=require('../Middleware/upload');
const protect=require('../Middleware/auth');
const { model } = require('mongoose');

router.use(protect);
router.post("/create",upload.single('image'), categoryController.createCategory);
router.post('/update',upload.single('image'), categoryController.updateCategory);
router.get('/getdata',categoryController.getCategories);
router.delete('/delete',categoryController.deleteCategory);

module.exports=router;