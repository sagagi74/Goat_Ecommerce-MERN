import React, { useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ADD_TRANSACTION_DETAIL } from "../utils/mutations";
import { GET_TRANSACTIONS_BY_CUSTOMER, QUERY_USER,GET_PRODUCTS } from "../utils/queries";
import { useMutation, useLazyQuery, useQuery } from '@apollo/client';
import Auth from '../utils/auth';

const loggedIn = Auth.loggedIn();

export default function ProductDetails() {
    const location = useLocation();
    const navigate = useNavigate();

    const [getCurrentUser, {data: UserData}] = useLazyQuery(QUERY_USER);
    const [getUserData, { data: data2, fetchMore, called, loading, error }] = useLazyQuery(GET_TRANSACTIONS_BY_CUSTOMER, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });
    const [hasMore, setHasMore] = useState(true);
    const [addTransactionDetail, { data: data3, error: error2 }] = useMutation(ADD_TRANSACTION_DETAIL);
    
    

    useEffect(() => {
        if (loggedIn) {
            const token = Auth.getProfile();
            getCurrentUser({
                variables: { email:token.data.email },
            });
        }
    },[loggedIn])

    const userID = UserData && UserData.customer._id;
    console.log(userID);

    useEffect(() => {
        try {
            if (userID && hasMore) {
                getUserData({
                    variables: {
                        customer_id: userID,
                        ordered: false
                    }
                });
            }
        } catch (e) {
            console.log(e, e.message);
        }
    }, [getUserData, userID, hasMore]);

    
    useEffect(() => {
        if (!location.state) {
            navigate('/'); // Redirect to products list if no state is available
        }
    }, [location, navigate]);

    if (!location.state) {
        return null; // Return null or a loading indicator while redirecting
    }

    const { product } = location.state;

    const handleAddToCart = async () => {
        try {
                const ordered = false;
                const productID = product._id;

                const response = await addTransactionDetail({
                    variables: { transaction_id: data2.transactionMain2[0]._id, product_id: productID, ordered }
                })

        } catch (err) {
            console.error(err);
            alert('Error adding product to cart. Please try again.');
        }
        navigate(`/shoppingCart`);
    }

    return (
        <>
        {loggedIn ? (
            <section className="product text-center">
                <img src={product.product_url} alt={product.product_name} width="400" id="product-image" />
                <div className="product-details">
                    <h4 id="product-name">{product.product_name}</h4>
                    <h5 id="product-description">{product.product_description}</h5>
                    <h6 id="product-price">Cost: ${product.price}</h6>
                    <div className="product-bought mx-auto" style={{width: "25%"}}>
                        <button onClick={handleAddToCart} className="btn btn-warning btn-sm mt-2">ADD</button>
                    </div>
                </div>
            </section>
        ) : (
            <section className="product text-center">
                <img src={product.product_url} alt={product.product_name} height="400" width="400" id="product-image" />
                <div className="product-details">
                    <h4 id="product-name">{product.product_name}</h4>
                    <h5 id="product-description">{product.product_description}</h5>
                    <h6 id="product-price"><strong>LOGIN TO VIEW PRICE</strong></h6>
                </div>
            </section>
        )}
        </>
    );
}