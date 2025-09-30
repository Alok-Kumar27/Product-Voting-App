const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Subcategory', subcategorySchema);
