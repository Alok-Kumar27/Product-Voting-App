const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // category name/title
    description: { type: String },           // optional description
    image: { type: String },                 // path to uploaded image
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
