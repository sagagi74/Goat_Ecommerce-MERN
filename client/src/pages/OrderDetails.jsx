// Page to show the orders in one order\

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { GET_TRANSACTION_DETAILS } from '../utils/queries';
import '../styles/OrderDetails.css'; 

export default function OrderDetails() {
  
  const { orderId } = useParams();
  const { loading, error, data } = useQuery(GET_TRANSACTION_DETAILS, {
    variables: { transactionId: orderId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  
  const details = data.getTransactionDetails || [];
    return (

    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <h2 className="text-center mb-4">Order Details</h2>
          <div className="card order-card mb-4">
            <div className="card-header">
              Order Number: #{orderId}
            </div>
            <div className="card-body">

            {details.length > 0 ? (
        details.map((detail) => (
                <div className="row">
                  {/* <div className="col-md-4 ">
                    <img src={order.image} className="img-fluid order-image" alt={order.name} />
                  </div> */}

                  <div className="text col-md-8">
                    <ul className="list-group" key={orderId} >
                      <li className="list-group-item"><strong>order: </strong> NAME </li>
                      <li className="list-group-item"><strong>Description: </strong> Disc </li>
                      <li className="list-group-item"><strong>Total</strong> ${detail.price}</li>
                    </ul>
                  </div>
                </div>
                  ))
                ) : (
                  <p>No details found for this order.</p>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};