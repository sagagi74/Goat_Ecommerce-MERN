// Import the express router
const router = require('express').Router();

// Import the transaction controller functions
const { createTransaction, completeTransaction } = require('../../controllers/transactionController');

// Route to create a new transaction
// Example usage: POST http://localhost:3001/api/transactions/
// Request body example:
// {
//   "customer_id": "60d0fe4f5311236168a109ca",
//   "total": 100.00
// }
router.post('/', createTransaction);

// Route to complete a transaction
// Example usage: PUT http://localhost:3001/api/transactions/complete
// Request body example:
// {
//   "customer_id": "60d0fe4f5311236168a109ca"
// }
router.put('/complete', completeTransaction);

// Export the router to be used in other parts of the application
module.exports = router;
