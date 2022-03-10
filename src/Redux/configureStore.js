import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import productListReducer from './PLP/listingPage';

const reducer = combineReducers({
  productList: productListReducer,

});

const store = createStore(
  reducer,
  applyMiddleware(logger, thunk),
);

export default store;
