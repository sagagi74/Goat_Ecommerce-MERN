// Import the TransactionMain and TransactionDetail models from the models directory
const { TransactionMain, TransactionDetail } = require('../models');

module.exports = {
  // Asynchronous function to create a new transaction
  async createTransaction({ body }, res) {
    // Create a new transaction in the TransactionMain collection with the data from the request body
    const transactionMain = await TransactionMain.create(body);
    // Send a JSON response with the newly created transaction data
    res.json(transactionMain);
  },

  // Asynchronous function to complete a transaction
  async completeTransaction({ body }, res) {
    // Destructure customer_id from the request body
    const { customer_id } = body;

    // Update the TransactionMain documents for the specified customer_id where ordered is false
    // Set ordered to true for these documents
    await TransactionMain.updateMany(
      { customer_id, ordered: false },
      { ordered: true }
    );

    // Find the TransactionMain documents for the specified customer_id where ordered is true
    // Select only the _id field from these documents
    const transactionIds = await TransactionMain.find({ customer_id, ordered: true }).select('_id');

    // Update the TransactionDetail documents where transaction_id is in the array of transactionIds
    // and ordered is false, set ordered to true for these documents
    await TransactionDetail.updateMany(
      { transaction_id: { $in: transactionIds }, ordered: false },
      { ordered: true }
    );

    // Send a JSON response with a success message
    res.json({ message: 'Transaction completed successfully' });
  },
};
