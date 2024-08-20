// Import the necessary modules from mongoose
const { Schema, model } = require('mongoose');

// Define a schema for the Product model with various fields and their constraints
const productSchema = new Schema({
  product_name: {
    type: String,
    required: true,
    maxlength: 100, // Maximum length of the product name is 100 characters
  },
  product_description: {
    type: String,
    required: true, // Product description is required
  },
  product_url: {
    type: String,
    required: true,
    maxlength: 200, // Maximum length of the product URL is 200 characters
  },
  price: {
    type: Number,
    required: true, // Price is required and should be a number
  },
});

// Create the Product model using the productSchema
const Product = model('Product', productSchema);

// Export the Product model
module.exports = Product;
