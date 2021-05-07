import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"

import Login  from "./screens/Login";
import HomeClient from './screens/HomeClient';
import HomeStorer from './screens/HomeStorer';
import Signup from './screens/Signup';
import ProductViewScreen from './screens/ProductViewScreen';
import CartView from './screens/CartView';
import HomeAdmin from './screens/HomeAdmin';
import AddProduct from './screens/AddProduct';
import AddUser from './screens/AddUser';
import EditProduct from './screens/EditProduct';
import EditUser from './screens/EditUser';
import Checkout from './screens/Checkout';

import { AuthProvider } from './utils/AuthContext';
import { CartProvider } from './utils/CartContext';

import ClientRoute from './utils/ClientRoute';
import StorerRoute from './utils/StorerRoute';
import AdminRoute from './utils/AdminRoute';
import Settings from './screens/Settings';
import Records from './screens/Records';

function App() {
  return (
      <AuthProvider>
        <Router>
          <CartProvider>
            <Route exact path="/" component={ HomeClient }/>
            <Route exact path="/login" component={ Login }/>
            <Route exact path="/signup" component={ Signup }/>
            <Route exact path="/product/:id" component={ ProductViewScreen } />
            <Route exact path="/cart" component={ CartView }/>
            <Route exact path="/settings/:id" component={ Settings }/>
            <ClientRoute exact path='/checkout' component={ Checkout }/>
            <ClientRoute exact path='/record/:id' component={ Records }/>
          </CartProvider>

          <StorerRoute exact path="/storer" component={ HomeStorer }/>
          <StorerRoute exact path='/add/product' component={ AddProduct }/>
          <StorerRoute exact path='/edit/product/:id' component = { EditProduct }/>

          <AdminRoute exact path="/admin" component={ HomeAdmin }/>
          <AdminRoute exact path='/add/user' component = { AddUser }/>
          <AdminRoute exact path='/edit/user/:id' component = { EditUser }/>
        </Router>
      </AuthProvider>
  );
}

export default App;
