/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { attrSelector, addProductToCart, removeFromCart } from '../../../Redux/PLP/listingPage';

const mapStateToProps = (state) => ({
  myState: state.productList,
});

const mapDispatchToProps = () => ({
  attrSelector,
  addProductToCart,
  removeFromCart,
});

class ProductDescAtrributes extends Component {
  selectAttribute(attrName) {
    const { attrSelector } = this.props;
    attrSelector(attrName);
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

  render() {
    const {
      attr, price, pName, inStock, desc, myState: { shoppingCart },
    } = this.props;

    const description = desc;

    const displayPrice = price.filter((item) => item.selected === true);

    const check = shoppingCart.filter((item) => item.name === pName);

    return (
      <article className="attr attr-desc d-flex f-col">
        <h2>{pName}</h2>
        {
        attr.map((item) => (item.id === 'Color'

          ? (
            <div className="attr-list-desc d-flex a-center f-col" key={item.id}>
              <h3 className="title-header">
                { item.id }
                :
              </h3>
              <div className="attr-btn-cont btn-cont-desc d-flex a-center">
                {item.items.map((size) => (size.selected ? <button type="button" className="attr-btn selected-color" onClick={() => this.selectAttribute(size.displayValue)} key={size.id} style={{ backgroundColor: size.displayValue }} /> : <button type="button" className="attr-btn" onClick={() => this.selectAttribute(size.displayValue)} key={size.id} style={{ backgroundColor: size.displayValue }} />))}

              </div>
            </div>
          )

          : (
            <div className="attr-list-desc d-flex a-center f-col" key={item.id}>
              <h3 className="title-header">
                { item.id }
                :
              </h3>
              <div className="attr-btn-cont btn-cont-desc d-flex a-center">
                {item.items.map((size) => (size.selected ? (
                  <button type="button" className="attr-btn selected-size" onClick={() => this.selectAttribute(size.displayValue)} key={size.id}>
                    {' '}
                    {size.value}
                  </button>
                ) : (
                  <button className="attr-btn" type="button" onClick={() => this.selectAttribute(size.displayValue)} key={size.id}>
                    {' '}
                    {size.value}
                  </button>
                )))}
              </div>
            </div>
          )))
       }
        <article>
          <h4>PRICE: </h4>
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
          {
                    inStock || <h3 className="desc-out-stock">OUT OF STOCK</h3>
                }
        </article>
        {
               inStock ? (
                 <div className="cart-btn-container d-flex a-center j-center">
                   <button type="button" className={check.length > 0 ? 'add-to-cart cart-control-btn remove-btn' : 'add-to-cart cart-control-btn'} onClick={(e) => this.addToCart(e, pName, attr)}>{check.length > 0 ? 'Remove From Cart' : 'Add To Cart'}</button>
                 </div>
               ) : <button type="button" disabled className="add-to-cart cart-control-btn out-stock-btn j-center a-center d-flex" onClick={(e) => this.addToCart(e, pName, attr)}>Add to Cart</button>
      }

        <div dangerouslySetInnerHTML={{ __html: description }} />

      </article>

    );
  }
}

ProductDescAtrributes.propTypes = ({
  attr: PropTypes.arrayOf(String).isRequired,
  price: PropTypes.arrayOf(String).isRequired,
  pName: PropTypes.string.isRequired,
  inStock: PropTypes.bool.isRequired,
  desc: PropTypes.string.isRequired,
  myState: PropTypes.objectOf(String).isRequired,
  shoppingCart: PropTypes.arrayOf(Object),
  addProductToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  attrSelector: PropTypes.func.isRequired,
});

ProductDescAtrributes.defaultProps = ({
  shoppingCart: [],
});

export default connect(mapStateToProps, mapDispatchToProps())(ProductDescAtrributes);
