import React from 'react';
import { Switch, Redirect, Link } from 'react-router-dom';
import PrivateRoute from './component/PrivateRoute';
import LoginPage from './component/LoginPage/loginPage';
import { Router } from 'react-router-dom';
import './App.css'
import HomePage from './component/HomePage/homePage';
import { connect } from 'react-redux';
import { alertActions } from './action/alertAction';
import { history } from './helper/history';
import ProductDetail from './component/ProductDetail/productDetails';
import Cart from './component/Cart/cart';
import Checkout from './component/Checkout/checkoutPage';
import OrderPage from './component/Order/orderPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }

  render() {
    const { alert } = this.props;
    const { loggingIn } = this.props.authentication;
    const cart = this.props.cart.addedItems;
    return (
        <Router history={history}>
          <div className="main-container">
            <nav className="nav-wrapper">
              <div>
                <Link to="/home" className="logo">Dummy Shop</Link>
                <ul className="right">
                <li className=""><Link to="/home">Products</Link></li>
                  <li className="cart-icon">
                    <Link to="/cart">
                      <i className="material-icons">shopping_cart</i>
                    </Link>
                    <span>{(cart && cart.length) || "0"}</span>
                  </li>
                  {loggingIn ? <li className="cart-icon"><Link to="/login"><i className="material-icons">logout</i></Link></li> :
                    <li className="cart-icon"><Link to="/login"><i className="material-icons">login</i></Link></li>}
                </ul>
              </div>
            </nav>
            <div className="col-sm-12">
              {alert && alert.message &&
                <div className={`alert ${alert.type} alert-message`}>{alert.message}</div>
              }
              <Switch>
                <PrivateRoute path="/login" type="guest">
                  <LoginPage />
                </PrivateRoute>
                <PrivateRoute exact path="/home" type="guest"> <HomePage /></PrivateRoute>
                <PrivateRoute path="/product-detail" type="guest">
                  <ProductDetail />
                </PrivateRoute>
                <PrivateRoute path="/cart" type="guest">
                  <Cart />
                </PrivateRoute>
                <PrivateRoute path="/checkout" type="private">
                  <Checkout />
                </PrivateRoute>
                <PrivateRoute path="/order" type="private">
                  <OrderPage />
                </PrivateRoute>
                
                <Redirect from="*" to="/home" />
              </Switch>
            </div>
          </div>
          <footer className="footer">Buy Today Sell Tomorrow !!</footer>
        </Router>
        
    );
  }
}

function mapState(state) {
  const { alert, authentication, cart } = state;

  return { alert, authentication, cart }
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

export default connect(mapState, actionCreators)(App);
