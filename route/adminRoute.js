const express=require("express");
const route=express.Router();
const adminController=require('../controller/adminController');
const protect=require('../Middleware/auth')

route.post("/register",adminController.registerAdmin);
route.post("/login",adminController.loginAdmin);
route.get("/profile",protect,adminController.getprofile);


// working why we not use protect in register ang login 
module.exports= route;