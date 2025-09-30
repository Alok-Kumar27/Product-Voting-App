 const express=require('express');
 const app=express();
 require('dotenv').config();
 const connectDB=require('./config/db')
//  const cors = require('cors');
// app.use(cors());

 //middleware
 app.use(express.json());

 // routes
 const adminRoute=require('./route/adminRoute')
 const categoryRoute=require('./route/categoryRoute')
 const productRoute=require('./route/productRoute')
 const subcategories=require('./route/subcategoryRoute')


  //base url
 app.use('/category',categoryRoute);
 app.use("/admin",adminRoute);
 app.use("/product",productRoute);
 app.use('/subcategory',subcategories);

 connectDB();

//  port
 const PORT=process.env.PORT|| 2000
 app.listen(PORT,()=>{
    console.log(`server run on port ${PORT}`)
 })