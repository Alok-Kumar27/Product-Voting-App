
const Subcategory = require('../model/subcategory');

// CREATE Subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const { title, description, categoryId } = req.body;
    const image = req.file ? req.file.filename : null;

    const subcategory = await Subcategory.create({
      title,
      description,
      categoryId,
      image,
    });

    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ALL Subcategories
exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('categoryId', 'title');
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Subcategory
exports.updateSubcategory = async (req, res) => {
  try {
    const { title, description, categoryId } = req.body;
    const image = req.file ? req.file.filename : undefined; // only update if file is uploaded

    const updateData = { title, description, categoryId };
    if (image) updateData.image = image;

    const subcategory = await Subcategory.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });

    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE Subcategory
exports.deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndDelete(req.params.id);

    if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });

    res.json({ message: 'Subcategory deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
