const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Customer {
    _id: ID
    first_name: String
    last_name: String
    email: String
  }

  type Product {
    _id: ID
    product_name: String
    product_description: String
    product_url: String
    price: Float
  }

  type TransactionMain {
    _id: ID
    total: Float
    customer_id: ID
    created_date: String
    ordered: Boolean
  }

  type TransactionDetail {
    _id: ID
    transaction_id: ID
    product_id: ID
    ordered: Boolean
  }

  type Query {
    customers: [Customer]
    customer(email: String!): Customer
    products: [Product]
    product(_id: ID!): Product
    transactionsMain: [TransactionMain]
    transactionMain(_id: ID!): TransactionMain
    transactionsMain2(customer_id: ID!): [TransactionMain]
    transactionMain2(customer_id: ID!,ordered: Boolean) : [TransactionMain]
    transactionsDetail: [TransactionDetail]
    transactionDetail(transaction_id: ID!, ordered: Boolean): [TransactionDetail]
    getTransactionDetails(transaction_id: ID!): [TransactionDetail]
    productDataforCart(_id:ID!): [Product]
  }

  type Mutation {
    addUser(first_name: String!, last_name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProduct(
      product_name: String!
      product_description: String!
      product_url: String!
      price: Float!
    ): Product
    addTransactionMain(
      total: Float!
      customer_id: ID!
      ordered: Boolean!
    ): TransactionMain
    addTransactionDetail(
      transaction_id: ID!
      product_id: ID!
      ordered: Boolean!
    ): TransactionDetail
    completeTransaction(
      customer_id: ID!
      total: Float!  
    ): String
  }

  type Auth {
    token: ID!
    customer: Customer
  }
`;

module.exports = typeDefs;