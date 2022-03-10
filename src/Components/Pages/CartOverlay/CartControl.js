/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CartControl extends Component {
  render() {
    const { cart, total } = this.props;

    const displayPrice = cart[0].prices.filter((price) => price.selected === true);

    return (
      <div className="cart-control">
        <div>
          <div className="total-cont d-flex a-center">
            <h3>Total:</h3>
            {displayPrice.length > 0
              ? (
                <h3>
                  <span>
                    {displayPrice[0].currency.symbol}
                  </span>
                  <span>
                    {total}
                  </span>
                </h3>
              )

              : (
                <h3>
                  <span>
                    {cart[0].prices[0].currency.symbol}
                  </span>
                  <span>
                    {total}
                  </span>
                </h3>
              )}
          </div>
          <div className="checkout-bag-cont d-flex a-center">
            <Link to="/myCart" className="view-bag d-flex a-center j-center">
              View Bag
            </Link>
            <button type="button" className="checkout">Checkout</button>
          </div>
        </div>
      </div>
    );
  }
}

CartControl.propTypes = ({
  total: PropTypes.string.isRequired,
  cart: PropTypes.arrayOf(Object),
});

CartControl.defaultProps = ({
  cart: [],
});

export default CartControl;
