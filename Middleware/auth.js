const jwt=require('jsonwebtoken');

const Admin=require('../model/admin');
require('dotenv').config();

const protect=async(req,res,next)=>{
 let token;
 if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
  token= req.headers.authorization.split(' ')[1];
   try{  
   const decoded= jwt.verify(token,process.env.JWT_SECRET);
  //  req.admin= await Admin.findById(id).select('-password');
  req.admin = await Admin.findById(decoded.id).select('-password');
   next();
   }catch(error){
    res.status(404).json({message:error});
   }
 }
 if(!token) return res.status(401).json({message:"Not authorized, no token"});
};

module.exports = protect;  