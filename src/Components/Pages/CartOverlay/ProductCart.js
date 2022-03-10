/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaPlus, FaMinus, FaTimes } from 'react-icons/fa';
import { addQuantity, reduceQuantity, removeFromCart } from '../../../Redux/PLP/listingPage';

const mapStateToProps = (state) => ({
  myState: state.productList,
});

const mapDispatchToProps = () => ({
  addQuantity,
  reduceQuantity,
  removeFromCart,
});

class ProductCart extends Component {
  increaseProductQuantity(productId) {
    const { addQuantity } = this.props;
    addQuantity(productId);
  }

  decreaseProductQuantity(productId) {
    const { reduceQuantity } = this.props;
    reduceQuantity(productId);
  }

  removeCart(productId) {
    const { removeFromCart } = this.props;
    removeFromCart(productId);
  }

  render() {
    const {
      prodId, name, images, price, quantity, attr,
    } = this.props;

    const displayPrice = price.filter((item) => item.selected === true);

    return (
      <div className="cart-product d-flex a-center j-center">
        <section className="cart-product-details">
          <h2>{name}</h2>
          <article>
            {displayPrice.length > 0
              ? (
                <p>
                  <span>
                    {displayPrice[0].currency.symbol}
                  </span>
                  <span>
                    {displayPrice[0].amount}
                  </span>
                </p>
              )

              : (
                <p>
                  <span>
                    {price[0].currency.symbol}
                  </span>
                  <span>
                    {price[0].amount}
                  </span>
                </p>
              )}
          </article>
          <div className="attr-cart d-flex f-col a-center j-center">
            {
                          attr.map((item) => (item.id === 'Color'

                            ? (
                              <div className="attr-btn-cont d-flex a-center j-center" key={item.id}>
                                {item.items.map((size) => (size.selected ? <button className="attr-btn selected-color" type="button" key={size.id} style={{ backgroundColor: size.displayValue }} /> : <button type="button" className="attr-btn" key={size.id} style={{ backgroundColor: size.displayValue }} />))}

                              </div>
                            )
                            : (
                              <div className="attr-btn-cont d-flex a-center j-center" key={item.id}>
                                {item.items.map((size) => (size.selected ? (
                                  <button
                                    type="button"
                                    className="attr-btn selected-size"
                                    key={size.id}
                                  >
                                    {' '}
                                    {size.value}
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="attr-btn"
                                    key={size.id}
                                  >
                                    {' '}
                                    {size.value}
                                  </button>
                                )))}
                              </div>
                            )))
                     }
          </div>
        </section>
        <section className="cart-quantity d-flex f-col a-center j-center">
          <button type="button" className="add-quantity" onClick={() => this.increaseProductQuantity(prodId)}><FaPlus /></button>
          <p>{quantity}</p>
          <button type="button" className="add-quantity" onClick={() => this.decreaseProductQuantity(prodId)}><FaMinus /></button>
        </section>
        <section className="cart-prod-img">
          <img src={images[0]} alt="product-img" />
        </section>
        <button className="cart-remove" type="button" onClick={() => this.removeCart(name)}>
          {' '}
          <FaTimes />
          {' '}
        </button>

      </div>
    );
  }
}

ProductCart.propTypes = ({
  prodId: PropTypes.string,
  name: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(String).isRequired,
  price: PropTypes.arrayOf(Object).isRequired,
  quantity: PropTypes.number.isRequired,
  attr: PropTypes.arrayOf(String).isRequired,
  addQuantity: PropTypes.func.isRequired,
  reduceQuantity: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
});

ProductCart.defaultProps = ({
  prodId: '',
});

export default connect(mapStateToProps, mapDispatchToProps())(ProductCart);
