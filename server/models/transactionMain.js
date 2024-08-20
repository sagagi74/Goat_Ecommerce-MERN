// Import the necessary modules from mongoose
const { Schema, model } = require('mongoose');

// Define a schema for the TransactionMain model with various fields and their constraints
const transactionMainSchema = new Schema({
  total: {
    type: Number,
    required: true, 
  },
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: 'Customer', // Reference to the Customer model
    // required: true, // customer_id is required //disabled because of testing
  },
  created_date: {
    type: Date,
    default: Date.now, // Default value is the current date and time
    required: true, // created_date is required
  },
  ordered: {
    type: Boolean,
    default: false, // Default value for ordered is false
    required: true, // ordered field is required
  },
});

// Create the TransactionMain model using the transactionMainSchema
const TransactionMain = model('TransactionMain', transactionMainSchema);

// Export the TransactionMain model
module.exports = TransactionMain;
