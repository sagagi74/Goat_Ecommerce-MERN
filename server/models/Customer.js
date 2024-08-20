// Import the necessary modules from mongoose and bcrypt
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Define a schema for the Customer model with various fields and their constraints
const customerSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      maxlength: 30,
    },
    last_name: {
      type: String,
      required: true,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      maxlength: 255,
    },
    session_id: String,
    created_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Before saving a new or modified customer, hash the password
customerSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10; // Number of salt rounds for hashing
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Method to check if the provided password matches the hashed password
customerSchema.methods.isCorrectPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Create the Customer model using the customerSchema
const Customer = model('Customer', customerSchema);

// Export the Customer model
module.exports = Customer;
