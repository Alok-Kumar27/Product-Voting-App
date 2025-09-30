const Admin = require('../model/admin');
const jwt =   require('jsonwebtoken');

exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create new admin
    const admin = await Admin.create({ name, email, password });

    // Create JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });// doubt

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login admin

exports.loginAdmin=async(req,res)=>{
  ///ai code
   if (!req.body) {
    return res.status(400).json({ message: "Missing request body" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  ///ai code

  // const {email,password}=req.body;
  try{
  const admin= await Admin.findOne({email});
  if( !admin || !(await admin.matchPassword(password) )){
    return res.status(404).json({message:"Invalid credential"});
  }
//create Token
  const token =  jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.status(200).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token,

  })
}catch(error){
  res.status(303).json({message:error.message})
}

}

// get admin id(profile)
exports.getprofile=async(req,res)=>{
 const admin =await Admin.findById(req.admin.id).select('-password');//({req.admin.id})  doubt
//  res.json({admin});//wrong
 res.json(admin);// currect
}

