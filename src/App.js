import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';
import { getProducts } from './Redux/PLP/listingPage';
import './App.css';
import ListingPage from './Components/Pages/ProductLisitingPage/ListingPage';
import ProductDescPage from './Components/Pages/ProductDescPage/ProductDescPage';
import ShoppingCartPage from './Components/Pages/CartPage/ShoppingCartPage';
import Header from './Components/Header';

const mapStateToProps = (state) => ({
  myState: state.productList,
  isLoading: state.productList.isLoading,
});

const mapDispatchToProps = () => ({
  getProducts,
});

class App extends Component {
  componentDidMount() {
    const { getProducts } = this.props;
    getProducts();
  }

  render() {
    const { myState: { products, shoppingCart, total }, isLoading } = this.props;

    return (
      <div className="App">
        <Header />
        {
              isLoading
                ? <h1 className="loading-header a-center j-center d-flex">Loading....</h1>
                : (
                  <div className="product-cont-home d-flex a-center j-center">
                    <Routes>
                      <Route exact path="/" element={<ListingPage products={products} />} />
                      <Route exact path="/product/:id" element={<ProductDescPage products={products} />} />
                      <Route exact path="/myCart" element={<ShoppingCartPage cart={shoppingCart} total={total} />} />
                    </Routes>
                  </div>
                )
         }
      </div>
    );
  }
}

App.propTypes = {
  myState: PropTypes.objectOf(String).isRequired,
  products: PropTypes.arrayOf(Object),
  isLoading: PropTypes.bool.isRequired,
  getProducts: PropTypes.func.isRequired,
  shoppingCart: PropTypes.arrayOf(Object),
  total: PropTypes.number,
};

App.defaultProps = {
  products: [],
  shoppingCart: [],
  total: 0,
};

export default connect(mapStateToProps, mapDispatchToProps())(App);
