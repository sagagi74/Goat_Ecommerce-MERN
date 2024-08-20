import { useEffect } from'react';
import { useNavigate } from "react-router-dom";
import { GET_PRODUCTS,GET_TRANSACTIONS_BY_CUSTOMER,QUERY_USER } from "../utils/queries";
import {ADD_TRANSACTION_MAIN} from "../utils/mutations"
import { useQuery,useLazyQuery, useMutation } from "@apollo/client";
import AuthService from '../utils/auth';

export default function Products() {
    const loggedIn = AuthService.loggedIn();
    const navigate = useNavigate();
    const { data } = useQuery(GET_PRODUCTS);

    const products = data?.products || [];

    const handleProductClick = (product) => {
        navigate(`/product/${product._id}`, { state: { product } });
    };

    const [getCurrentUser, {data:data3}] = useLazyQuery(QUERY_USER);
    const [getUserData, { data:data2 }] = useLazyQuery(GET_TRANSACTIONS_BY_CUSTOMER);
    const [addTransactionMain, {data:data4, error}] = useMutation(ADD_TRANSACTION_MAIN);

    useEffect(() => {
        if (loggedIn) {
            const token = AuthService.getProfile();
            getCurrentUser({
                variables: { email:token.data.email },
            });
        }
    },[data])
    
    const userID = data3 && data3.customer._id;

    useEffect(()=>{
        try{
            if(userID){
                getUserData({ variables: { 
                    customer_id: userID,
                    ordered:false
                }})
            }
        } catch (e){
            console.log(e,e.message);
        }
    },[userID])
    
    async function intermediate(){
        const ordered = false;
        const total = 0;
        const response = await addTransactionMain({
            variables: { ordered, customer_id: userID, total }
        })
    }

    console.log(data2);

    useEffect(()=>{
        try{
            if(data2){
                intermediate();
            }        
        } catch (e){
            console.log(e,e.message);
        }
    },[data2])

    
    return (
        <>
        {loggedIn ? (
            <section className="container border border-secondary" style={{width: "75%"}}>
                <div className="row">
                {products.map((product) => (
                    <div key={product._id} className="col-3 border border-secondary">
                        <button className="cursor-pointer border-0 bg-transparent" onClick={() => handleProductClick(product)}>
                            <div className="d-block mt-4 mx-auto" style={{width: "100%", height: "180px", overflow: "hidden"}}>
                                <img src={product.product_url} style={{width: "100%"}} alt={product.product_name} />
                            </div>
                            <p className="text-secondary">{product.product_name}</p>
                            <p className="fw-bold m-auto">${product.price}</p>                    
                        </button>
                    </div>
                ))}
                </div>
            </section>
        ) : (
            <section className="container" style={{width: "75%"}}>
                <div className="row">
                {products.map((product) => (
                    <div key={product._id} className="col-3 border border-secondary">
                        <button className="cursor-pointer border-0 bg-transparent" onClick={() => handleProductClick(product)}>
                            <div className="d-block mt-4 mx-auto" style={{width: "100%", height: "180px", overflow: "hidden"}}>
                                <img src={product.product_url} style={{width: "100%"}} alt={product.product_name} />
                            </div>
                            <p className="text-secondary">{product.product_name}</p>
                            <p className="fw-bold m-auto">Login to view price</p>                    
                        </button>
                    </div>
                ))}
                </div>
            </section>
        )}
        </>
    );
}