/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCart from '../CartOverlay/ProductCart';
import CartControl from '../CartOverlay/CartControl';
import './cartpage.css';

class ShoppingCartPage extends Component {
  render() {
    const { cart, total } = this.props;
    return (
      <div className="shopping-cart-page d-flex f-col a-center j-center">
        {
              cart.length > 0
                ? (
                  <div className="shopping-page-product-cont">
                    <h2>My Cart</h2>
                    {
                      cart.map((product) => (

                        <ProductCart
                          key={product.id}
                          prodId={product.id}
                          name={product.name}
                          images={product.gallery}
                          price={product.prices}
                          quantity={product.quantity}
                          attr={product.attributes}
                        />

                      ))
                  }
                  </div>
                )
                : <h1>Your cart is empty please add products from the store</h1>
          }
        <div className="cart-btn">
          {
                cart.length > 0 && <CartControl total={total} cart={cart} />
          }

        </div>
      </div>
    );
  }
}

ShoppingCartPage.propTypes = ({
  cart: PropTypes.arrayOf(Object),
  total: PropTypes.number,
});

ShoppingCartPage.defaultProps = ({
  cart: [],
  total: 0,
});

export default ShoppingCartPage;
