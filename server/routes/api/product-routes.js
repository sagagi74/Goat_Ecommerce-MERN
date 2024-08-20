// Import the express router
const router = require('express').Router();

// Import the product controller functions
const { getProducts, getProduct } = require('../../controllers/productController');

// Route to get all products
// Example usage: GET http://localhost:3001/api/products/
router.get('/', getProducts);

// Route to get a product by its ID
// Example usage: GET http://localhost:3001/api/products/60d0fe4f5311236168a109ca
router.get('/:id', getProduct);

// Export the router to be used in other parts of the application
module.exports = router;
