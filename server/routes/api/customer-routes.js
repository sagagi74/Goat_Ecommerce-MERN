// Import the express router
const router = require('express').Router();

// Import the product controller functions
const { getProducts, getProductById, createProduct } = require('../../controllers/productController');

// Route to get all products
// Example usage: GET http://localhost:3001/api/products/
router.get('/', getProducts);

// Route to get a product by its ID
// Example usage: GET http://localhost:3001/api/products/60d0fe4f5311236168a109ca
router.get('/:id', getProductById);

// Route to create a new product
// Example usage: POST http://localhost:3001/api/products/
// Body example: { "product_name": "New Product", "product_description": "This is a new product.", "product_url": "http://example.com/product.jpg", "price": 19.99 }
router.post('/', createProduct);

// Export the router to be used in other parts of the application
module.exports = router;
