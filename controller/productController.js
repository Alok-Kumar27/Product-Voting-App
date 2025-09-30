const Product = require('../model/product');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, category, subcategory, price } = req.body;
    const product = new Product({ name, category, subcategory, price });
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'name') // assuming Category has a 'name' field
      .populate('subcategory', 'name'); // assuming Subcategory has a 'name' field
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, subcategory, price } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, category, subcategory, price },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};