/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductCart from './ProductCart';
import { addQuantity, reduceQuantity } from '../../../Redux/PLP/listingPage';
import CartControl from './CartControl';
import './cart.css';

const mapStateToProps = (state) => ({
  myState: state.productList,
});

const mapDispatchToProps = () => ({
  addQuantity,
  reduceQuantity,
});

class MiniCart extends Component {
  render() {
    const { myState: { shoppingCart, total } } = this.props;

    return (
      <div className="mini-cart d-flex f-col a-center j-center">
        <h2>
          My Bag:
          <span>{shoppingCart.length}</span>
          {' '}
          items
        </h2>
        <div className="cart-content d-flex f-col a-center j-center">
          { shoppingCart.length > 0 ? shoppingCart.map((product) => (
            <ProductCart
              key={product.id}
              prodId={product.id}
              name={product.name}
              images={product.gallery}
              price={product.prices}
              quantity={product.quantity}
              attr={product.attributes}
            />
          )) : <h3>Your Cart is empty! Please add products to the cart</h3>}
        </div>
        <div className="cart-btn">
          {
                        shoppingCart.length > 0 && <CartControl total={total} cart={shoppingCart} />
                    }

        </div>

      </div>
    );
  }
}

MiniCart.propTypes = ({
  total: PropTypes.number,
  myState: PropTypes.objectOf(String).isRequired,
  shoppingCart: PropTypes.arrayOf(String),
});

MiniCart.defaultProps = ({
  shoppingCart: [],
  total: 0,
});

export default connect(mapStateToProps, mapDispatchToProps())(MiniCart);
