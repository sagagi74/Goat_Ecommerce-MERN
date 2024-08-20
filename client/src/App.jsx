import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import ShoppingCart from './pages/ShoppingCart';
import OrderDetails from './pages/OrderDetails';
import OrderHistory from './pages/OrderHistory';
import OrderComplete from "./pages/OrderComplete";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';// Construct our main GraphQL API endpoint


const httpLink = createHttpLink({
  uri: '/graphql',
});// Construct request middleware that will attach the JWT token to every request as an `authorization` header

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {  return (
    <div className="App">
      <ApolloProvider  client={client} >
          <Router>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route exact path="/" element={<Products />} />
              <Route exact path="/product/:productId" element={<ProductDetails />} />
              <Route path="/shoppingCart" element={<ShoppingCart />} />
              <Route path="/orderDetails/:orderId" element={<OrderDetails />} />
              <Route path="/orderHistory" element={<OrderHistory />} />
              <Route path="/orderComplete" element={<OrderComplete />} />
          </Routes>
          <Footer />
        </Router>
      </ApolloProvider>
    </div>
  );
}