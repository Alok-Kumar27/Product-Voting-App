const multer=require('multer');
const path=require('path');
const fs=require('fs');

// Ensure uploads folder exists
const UPLOAD_FOLDER = 'uploads';
if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER);
}

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_FOLDER);
  },
  filename: function (req, file, cb) {
    // - Why path.extname()?: Preserves the original file extension (.jpg, .png, etc.)
    cb(null, Date.now() + path.extname(file.originalname)); //
  },
}); 

// Optional: image filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  // - file.originalname: The original name of the uploaded file.
// - path.extname(...): Extracts the file extension (e.g., .jpg, .png).
// - .toLowerCase(): Ensures case-insensitive matching.
// - allowedTypes.test(...): Checks if the extension matches one of the allowed types.
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  // - file.mimetype: The actual MIME type sent by the browser (e.g., image/jpeg, image/png).
// - This is more reliable than just checking the extension.
// 🔐 Why this matters: MIME type is harder to fake and gives a better indication of the file's true nature
  const mimetype = allowedTypes.test(file.mimetype);// .mimetype : check the type of the incoming file
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const upload = multer({ storage, fileFilter });

// ✅ Export the multer instance directly
module.exports = upload;
