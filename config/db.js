const mongoose=require('mongoose');
const dotenv=require("dotenv");
dotenv.config();

async function connectDB() {
    try{
        await mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
   })
        console.log("mongoDB connected")
    }
    catch(err){
        console.error(err)
    }
}

module.exports=connectDB;

// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.DB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB Connected");
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

