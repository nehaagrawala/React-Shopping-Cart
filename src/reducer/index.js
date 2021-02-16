import { combineReducers } from 'redux';

import { authentication } from './user.reducer';
import { alert } from './alert.reducer';
import {getProductList, getProductDetailList} from './product.reducer';
import {cart, order} from './cart.reducer';

const rootReducer = combineReducers({
  authentication,
  alert,
  getProductList,
  getProductDetailList,
  cart,
  order
});

export default rootReducer;