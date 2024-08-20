// Import the Product model from the models directory
const { Product } = require('../models');

module.exports = {
  // Asynchronous function to get all products
  async getProducts(req, res) {
    // Fetch all products from the database
    const products = await Product.find();
    // Send a JSON response with the products data
    res.json(products);
  },
  
  // Asynchronous function to get a product by its ID
  async getProductById({ params }, res) {
    // Fetch a product from the database by its ID
    const product = await Product.findById(params.id);
    // Send a JSON response with the product data
    res.json(product);
  },

  // Asynchronous function to create a new product
  async createProduct({ body }, res) {
    // Create a new product with the data from the request body
    const product = await Product.create(body);
    // Send a JSON response with the newly created product data
    res.json(product);
  },
};
