const Category = require('../model/category');

// CREATE Category
exports.createCategory = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image = null;

    if (req.file) {
      image = req.file.filename; // or req.file.path if you want full path
    }

    const category = new Category({ title, description, image });
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE Category
exports.updateCategory = async (req, res) => {
  try {
    const { title, description } = req.body;
    let updateData = { title, description };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const category = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE Category
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
