// Import the Customer model from the models directory
const { Customer } = require('../models');
// Import the signToken function from the auth utility
const { signToken } = require('../utils/auth');

module.exports = {
  // Asynchronous function to create a new customer
  async createCustomer({ body }, res) {
    // Create a new customer with the data from the request body
    const customer = await Customer.create(body);
    // Generate a JWT for the newly created customer
    const token = signToken(customer);
    // Send a JSON response with the token and customer data
    res.json({ token, customer });
  },

  // Asynchronous function to log in an existing customer
  async login({ body }, res) {
    // Find a customer in the database by email address
    const customer = await Customer.findOne({ email: body.email });

    // If no customer is found, send a 400 status response with an error message
    if (!customer) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }

    // Check if the provided password is correct
    const validPassword = await customer.checkPassword(body.password);

    // If the password is incorrect, send a 400 status response with an error message
    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }

    // Generate a JWT for the customer upon successful login
    const token = signToken(customer);
    // Send a JSON response with the token and customer data
    res.json({ token, customer });
  },
};
