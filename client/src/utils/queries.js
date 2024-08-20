import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query customer($email: String!) {
    customer(email: $email) {
      _id
      first_name
      last_name
      email
    }
  }
`;
export const GET_CUSTOMERS = gql`
  query Customers {
    customers {
      _id
      first_name
      last_name
      email_address
    }
  }
`
export const GET_CUSTOMER_BY_ID = gql`
  query Customer($_id: ID!) {
    customer(_id: $_id) {
      _id
      first_name
      last_name
      email_address
    }
  }
`
export const GET_PRODUCTS = gql`
  query Products {
    products {
      _id
      product_name
      product_description
      product_url
      price
    }
  }
`
export const GET_PRODUCT_BY_ID = gql`
  query Product($_id: ID!) {
    product(_id: $_id) {
      _id
      product_name
      product_description
      product_url
      price
    }
  }
`
export const GET_TRANSACTIONS = gql`
  query Transactions {
    transactions {
      _id
      total
      customer_id
      created_date
      ordered
    }
  }
`
export const GET_TRANSACTIONS_BY_ID = gql`
  query transactionDetail($transaction_id: ID!,$ordered: Boolean) {
    transactionDetail(transaction_id: $transaction_id,  ordered: $ordered) {
      _id
      transaction_id
      product_id
      ordered
    }
  }
`;

export const GET_TRANSACTIONS_BY_CUSTOMER = gql`
  query transactionMain2($customer_id: ID!,$ordered: Boolean) {
    transactionMain2(customer_id: $customer_id, ordered: $ordered) {
      _id
      customer_id
      ordered
      total
    }
  }
`


export const GET_TRANSACTIONSMAIN_BY_CUSTOMER = gql`
  query transactionsMain2($customer_id: ID!) {
    transactionsMain2(customer_id: $customer_id) {
      _id
      customer_id
      ordered
      total
    }
  }
`

export const GET_TRANSACTION_DETAILS = gql`
  query GetTransactionDetails($transactionId: ID!) {
  getTransactionDetails(transaction_id: $transactionId) {
    _id
    ordered
    product_id
    transaction_id
  }
}
`;



export const GET_PRODUCT_IN_CART = gql`
  query productDataforCart($_id:ID!){
    productDataforCart(_id:$_id){
      _id
      product_name
      product_description
      product_url
      price
    }
  }
`