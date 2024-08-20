// Import the necessary modules from mongoose
const { Schema, model } = require('mongoose');

// Define a schema for the TransactionDetail model with various fields and their constraints
const transactionDetailSchema = new Schema({
  transaction_id: {
    type: Schema.Types.ObjectId,
    ref: 'TransactionMain', // Reference to the TransactionMain model
    // required: true, // transaction_id is required //disabled due to testing
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    // required: true, // product_id is required //disabled due to testing
  },
  ordered: {
    type: Boolean,
    default: false, // Default value for ordered is false
    required: true, // ordered field is required
  },
});

// Create the TransactionDetail model using the transactionDetailSchema
const TransactionDetail = model('TransactionDetail', transactionDetailSchema);

// Export the TransactionDetail model
module.exports = TransactionDetail;
