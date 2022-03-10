import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaShopify, FaShoppingCart } from 'react-icons/fa';
import { changeCurrency, displayOverlay } from '../Redux/PLP/listingPage';
import MiniCart from './Pages/CartOverlay/MiniCart';

const mapDispatchToProps = () => ({
  changeCurrency,
  displayOverlay,
});

const mapStateToProps = (state) => ({
  myState: state.productList,
  isLoading: state.productList.isLoading,

});

class Header extends Component {
  currencyChange(currencyValue) {
    const { changeCurrency } = this.props;
    changeCurrency(currencyValue);
  }

  controlCart() {
    const { displayOverlay } = this.props;
    displayOverlay();
  }

  render() {
    const { myState: { shoppingCart, cartOverlay } } = this.props;
    const currency = ['$', '£', 'A$', '¥', '₽'];

    return (
      <nav className="nav">
        <div className="nav-cont d-flex a-center">
          <Link to="/">
            <h1>Scandiweb Store</h1>
          </Link>
          <FaShopify className="nav-img" />
          <div className="cart-filter-currency d-flex a-center j-center">
            <select className="curr-filter" onChange={(e) => this.currencyChange(e.target.value)}>
              {currency.map((curr) => (
                <option className="option" value={curr} key={curr}>
                  {' '}
                  {curr}
                </option>
              ))}
            </select>
            <div className="shop-cart d-flex a-center j-center">
              {cartOverlay || <p className="cart-badge d-flex a-center j-center">{shoppingCart.length}</p> }
              <button label="cart-control" type="button" onClick={() => this.controlCart()}><FaShoppingCart /></button>
              {cartOverlay && <MiniCart />}
            </div>

          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  myState: PropTypes.objectOf(String).isRequired,
  cartOverlay: PropTypes.bool,
  shoppingCart: PropTypes.arrayOf(Object),
  changeCurrency: PropTypes.func.isRequired,
  displayOverlay: PropTypes.func.isRequired,
};

Header.defaultProps = {
  shoppingCart: [],
  cartOverlay: false,
};

export default connect(mapStateToProps, mapDispatchToProps())(Header);
