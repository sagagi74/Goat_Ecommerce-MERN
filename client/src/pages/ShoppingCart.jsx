import { QUERY_USER, GET_TRANSACTIONS_BY_CUSTOMER,GET_TRANSACTIONS_BY_ID,GET_PRODUCT_IN_CART} from "../utils/queries";
import { UPDATING_DATA_AFTER_CART } from "../utils/mutations";
import Auth from '../utils/auth'
import { useEffect,useState } from "react";
import {Link} from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';

export default function ShoppingCart() {
    const loggedIn = Auth.loggedIn();
    const [getCurrentUser, {data}] = useLazyQuery(QUERY_USER);
    const [getUserData, { data: data2, fetchMore, called, loading, error:error2 }] = useLazyQuery(GET_TRANSACTIONS_BY_CUSTOMER, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });
    const [hasMore, setHasMore] = useState(true);
    const [getProductTransaction, { data: data3, fetchMore:fetchMore2, called:called2, loading:loading2, error:error3 }] = useLazyQuery(GET_TRANSACTIONS_BY_ID, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });
    const [hasMore2, setHasMore2] = useState(true);

    const [getProductData,{data:productData}] =useLazyQuery(GET_PRODUCT_IN_CART);

    useEffect(() => {

        if (loggedIn) {
            const token = Auth.getProfile();
            getCurrentUser({
                variables: { email:token.data.email },
            });
        }
    },[loggedIn])

    const userID = data && data.customer._id;

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
    }, [getUserData, userID, hasMore2]);
    
    useEffect(() => {
        try{
            if(data2 && hasMore){
                getProductTransaction({ variables: {
                    transaction_id:data2.transactionMain2[0]._id,
                    ordered:false
                }})
            } 
        } catch (e){
            console.log(e,e.message);
        }
    },[getProductTransaction, data2, hasMore])

    let isValidData = true;

    if (data3 == undefined){
        isValidData = false;
    }

    const [allProduct, setAllProduct] = useState([]);

    useEffect(() => {
        async function passingData (){
            const allProduct = [];
            for (let i = 0; i < data3.transactionDetail.length ;i++) {
                
                const intermediate = await getProductData({ variables: {
                    _id:data3.transactionDetail[i].product_id
                }})
                if (intermediate){
                    allProduct.push(intermediate.data.productDataforCart[0]);
                }
            }
            
            allProduct.sort((a, b) => a.price - b.price);
            const uniqueAllProduct = allProduct.reduce((uniqueAllProduct,currentValue)=>{
                if(!uniqueAllProduct[currentValue._id]){
                    uniqueAllProduct[currentValue._id] = {...currentValue, quantity : 1, totalPrice : 1};
                }
                else{
                    uniqueAllProduct[currentValue._id].quantity += 1;
                                       
                }
                uniqueAllProduct[currentValue._id].totalPrice = uniqueAllProduct[currentValue._id].price * uniqueAllProduct[currentValue._id].quantity; 
                return uniqueAllProduct
            },{})

            setAllProduct(Object.values(uniqueAllProduct));
        }
        if(data3){
            passingData();
        }
        
    },[data3])

    const [updatetransaction, {error, data:updateTransactionData}] = useMutation(UPDATING_DATA_AFTER_CART)
    const updateTransactionIntermediate = async (event) => {
        event.preventDefault();
        
        try {
            const updateTotal = (allProduct.reduce((total, { totalPrice }) => total + Number(totalPrice), 0) * 1.1).toFixed(2)
            const mutationResponse = await  updatetransaction({
                variables: {customer_id: data.customer._id, total: parseFloat(updateTotal)},
            });
            console.log(mutationResponse)

            window.location.href = '/orderComplete';
        } catch (e) {
            console.log(e);
        }
    };
    


    return (
        <>
        {loggedIn ? (
            <section className = "container"> 
                {isValidData ? (
                    <div>
                        {allProduct.length && (
                            <div className = "container">
                                <div className = "row">
                                    <div className="col-8">
                                        <div className = "row">
                                            <div className = "col-3">
                                                <h3>Product and product name</h3>
                                            </div>
                                            <div className="col-2">
                                                <h3>Price</h3>
                                            </div>
                                            <div className="col-2">
                                                <h3>Quantity</h3>
                                            </div>
                                            <div className="col-2">
                                                <h3>Total Cost</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className = "row">
                                    <div className="col-8">
                                        {allProduct.map(({product_name,product_url,price,quantity},index) => (
                                            <div key={index} className = "row">
                                                <div  className = "col-3">
                                                    <p> {product_name} </p>
                                                    <img src={product_url} alt={product_name} style={{ width: '100%', height: 'auto' }} />
                                                </div>
                                                <div className="col-2">
                                                    <p>{price}</p>
                                                </div>
                                                <div className="col-2">
                                                    <p>{quantity}</p>
                                                </div>
                                                <div className="col-2">
                                                    <p>{Number(price) * Number(quantity)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className = "col-4 orderSummary">
                                        <h2 className = "bold">Order Summary</h2>
                                        <div>Order Subtotal:  {allProduct.reduce((total, { totalPrice }) => total + Number(totalPrice), 0)}
                                        </div>
                                        <p>Tax: 10%</p>
                                        <p>Total: ${(allProduct.reduce((total, { totalPrice }) => total + Number(totalPrice), 0) * 1.1).toFixed(2)}</p>
                                        <Link to ='/'>
                                            <button style={{width: "200px"}} type="button" id="backToProduct" className="btn btn-danger btn-lg btn-block ">Continue Shopping</button>
                                        </Link>
                                        <button style={{width: "200px"}} type="button" id="transaction" onClick={updateTransactionIntermediate} className="btn btn-dark btn-lg btn-block " >Buy! Buy! Buy!</button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                ):(
                    <p>No products in cart</p>
                )}
            </section>
        ) : (
            <h1>LOGIN TO SEE SHOPPING CART</h1>
        )}
        </>
    );
}