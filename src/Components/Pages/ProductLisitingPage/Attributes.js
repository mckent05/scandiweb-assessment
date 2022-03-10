/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import { attrSelector, addProductToCart, removeFromCart } from '../../../Redux/PLP/listingPage';

const mapDispatchToProps = () => ({
  attrSelector,
  addProductToCart,
  removeFromCart,
});

const mapStateToProps = (state) => ({
  myState: state.productList,
});

class Attributes extends Component {
  static displayPopUp(e) {
    const productContainer = e.currentTarget.parentElement;
    productContainer.classList.add('popup');
  }

  static closePopUp(e) {
    const productContainer = e.currentTarget.parentElement.parentElement.parentElement;
    productContainer.classList.remove('popup');
  }

  addToCart(e, productName, attr) {
    const { addProductToCart, removeFromCart } = this.props;
    let boolCheck = '';
    if (attr.length === 0) {
      boolCheck = true;
    }
    if (attr.length > 0) {
      attr.map((attr) => {
        boolCheck = attr.items.some((size) => size.selected === true);
        return attr;
      });
    }
    if (boolCheck) {
      if (e.target.innerHTML === 'Add To Cart') {
        addProductToCart(productName);
      } else {
        removeFromCart(productName);
      }
    } else if (!boolCheck) {
      window.alert(`Please select all attributes for ${productName}`);
    }
  }

  selectAttribute(attrName) {
    const { attrSelector } = this.props;
    attrSelector(attrName);
  }

  render() {
    const {
      attr, inStock, pName, myState: { shoppingCart },
    } = this.props;

    if (!inStock) {
      return (
        <div className="attr-container">
          <button type="button" disabled className="add" onClick={(e) => Attributes.displayPopUp(e, inStock)}><FaShoppingCart /></button>
        </div>
      );
    }

    return (
      <div className="attr-container">
        <button type="button" className="add" onClick={(e) => Attributes.displayPopUp(e, inStock, shoppingCart, pName)}><FaShoppingCart className="to-add" /></button>
        <article className="add-attr f-col a-center j-center">
          <div className="attr-close d-flex a-center j-center">
            <h3 className="attr-header d-flex j-center a-center">Select an Attribute</h3>
            <button type="button" className="close-pop" onClick={(e) => Attributes.closePopUp(e)}><FaTimes /></button>
          </div>

          {
                        attr.map((item) => (item.id === 'Color'

                          ? (
                            <div className="attr-list d-flex j-center a-center f-col" key={item.id}>
                              <h3>{ `${item.id}: `}</h3>
                              <div className="attr-btn-cont d-flex a-center j-center">
                                {item.items.map((size) => (size.selected ? <button type="button" className="attr-btn selected-color" onClick={() => this.selectAttribute(size.displayValue)} key={size.id} style={{ backgroundColor: size.displayValue }} /> : <button type="button" className="attr-btn" onClick={() => this.selectAttribute(size.displayValue)} key={size.id} style={{ backgroundColor: size.displayValue }} />))}

                              </div>

                            </div>
                          )

                          : (
                            <div className="attr-list d-flex j-center a-center f-col" key={item.id}>
                              <h3>{ `${item.id}: ` }</h3>
                              <div className="attr-btn-cont d-flex a-center j-center">
                                {item.items.map((size) => (size.selected ? (
                                  <button type="button" className="attr-btn selected-size" onClick={() => this.selectAttribute(size.displayValue)} key={size.id}>
                                    {' '}
                                    {size.value}
                                  </button>
                                ) : (
                                  <button type="button" className="attr-btn" onClick={() => this.selectAttribute(size.displayValue)} key={size.id}>
                                    {' '}
                                    {size.value}
                                  </button>
                                )))}
                              </div>

                            </div>
                          )))
                    }
          <div className="cart-btn-container d-flex a-center j-center">

            <button type="button" className={shoppingCart.filter((item) => item.name === pName).length > 0 ? 'add-to-cart cart-control-btn remove-btn' : 'add-to-cart cart-control-btn'} onClick={(e) => this.addToCart(e, pName, attr)}>{shoppingCart.filter((item) => item.name === pName).length > 0 ? 'Remove From Cart' : 'Add To Cart'}</button>
          </div>

        </article>
      </div>
    );
  }
}

Attributes.propTypes = ({
  attrSelector: PropTypes.func.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  attr: PropTypes.arrayOf(Object).isRequired,
  inStock: PropTypes.bool.isRequired,
  pName: PropTypes.string.isRequired,
  myState: PropTypes.objectOf(String).isRequired,
  shoppingCart: PropTypes.arrayOf(Object),
});

Attributes.defaultProps = ({
  shoppingCart: [],
});

export default connect(mapStateToProps, mapDispatchToProps())(Attributes);
