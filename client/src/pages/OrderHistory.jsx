import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import Auth from '../utils/auth';
import AuthService from '../utils/auth';
import { GET_TRANSACTIONS_BY_CUSTOMER, QUERY_USER } from '../utils/queries';
import '../styles/orderHistory.css';

export default function OrderHistory() {
    const loggedIn = AuthService.loggedIn();
    const navigate = useNavigate()
    const [getCurrentUser, {data}] = useLazyQuery(QUERY_USER);
    const [getUserData, { data:data2 }] = useLazyQuery(GET_TRANSACTIONS_BY_CUSTOMER);

    useEffect(() => {
        if (loggedIn) {
            const token = Auth.getProfile();
            getCurrentUser({
                variables: { email: token.data.email },
            });
        }
    }, [loggedIn, getCurrentUser]);

    const userID = data && data.customer._id;

    useEffect(()=>{
        try{
            if(userID){
                getUserData({ variables: { 
                    customer_id: userID,
                    ordered: true
                }})
            }        
        } catch (e){
            console.log(e,e.message);
        }
    },[getUserData,userID]);

  // Ensure data and transactionMain2 are defined
  const transactions = data2?.transactionMain2 || [];

  const filteredTransactions = transactions.filter(
    (transaction) => transaction.customer_id === userID && transaction.ordered === true
  );

  const handleOrderDetailsClick = (orderId) => {
    navigate(`/orderDetails/${orderId}`, { state: { orderId } });
  };

  return (
    <div className="containerFluid mt-5">
      <h1 className="text-center mb-4">Order History</h1>
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <div className="tableResponsive">
            <table className="table tableBordered">
              <thead>
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col2">Date</th>
                  <th scope="col3">Total</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction._id} className="clickableRow" onClick={() => handleOrderDetailsClick(transaction._id)}>
                    <td>{transaction._id}</td>
                    <td>10/2023</td>
                    <td>${transaction.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}