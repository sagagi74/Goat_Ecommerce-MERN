const { Customer, Product, TransactionMain, TransactionDetail } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const bcrypt = require('bcrypt');

const resolvers = {
  Query: {
    customers: async () => {
      return Customer.find();
    },
    customer: async (parent, { email }) => {
      return Customer.findOne({ email });
    },
    products: async () => {
      return await Product.find();
    },
    product: async (parent, { id }) => {
      return await Product.findById(id);
    },
    transactionsMain: async () => {
      return TransactionMain.find();
    },
    transactionMain: async (parent, { _id }) => {
      return TransactionMain.findById(_id);
    },
    transactionMain2: async (parent, {customer_id,ordered}) => {

      const customerTransactions = await TransactionMain.find({customer_id:customer_id, ordered:ordered})
      return customerTransactions;
    },
    transactionsDetail: async () => {
      return TransactionDetail.find();
    },
    transactionDetail: async (parent, { transaction_id,ordered }) => {
      const customerTransactionsDetails = await TransactionDetail.find({transaction_id:transaction_id,ordered:ordered});
      return customerTransactionsDetails;
    },
    productDataforCart: async (parent, {_id}) => {
      const productDataReturned = await Product.find({_id:_id});
      return productDataReturned;
    },
    getTransactionDetails: async (parent, { transaction_id }) => {
      return TransactionDetail.find({ transaction_id: transaction_id });
    }
  },
  Mutation: {
    addUser: async (parent, { first_name, last_name, email, password }) => {
      const customer = await Customer.create({ first_name, last_name, email, password });
      const token = signToken(customer);
      return { token, customer };
    },
    login: async (parent, { email, password }) => {
      const customer = await Customer.findOne({ email });

      if (!customer) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await bcrypt.compare(password, customer.password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(customer);

      return { token, customer };
    },
    addProduct: async (parent, args) => {
      return Product.create(args);
    },
    addTransactionMain: async (parent, args) => {
      const addTransactionMain = TransactionMain.create(args);
      return addTransactionMain;
    },
    addTransactionDetail: async (parent, args) => {
      return TransactionDetail.create(args);
    },
    completeTransaction: async (parent, { customer_id, total }) => {
      await TransactionMain.updateMany(
        { customer_id, ordered: false },
        { ordered: true, total: total },
      );

      const transactionIds = await TransactionMain.find({ customer_id, ordered: true }).select('_id');

      await TransactionDetail.updateMany(
        { transaction_id: { $in: transactionIds }, ordered: false },
        { ordered: true }
      );

      return 'Transaction completed successfully';
    },
  },
};

module.exports = resolvers;
