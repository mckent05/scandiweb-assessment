import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { viewProductDetails } from '../../../Redux/PLP/listingPage';
import Attributes from './Attributes';

const mapDispatchToProps = () => ({
  viewProductDetails,
});

class ProductCard extends Component {
  viewProduct(id) {
    const { viewProductDetails } = this.props;
    viewProductDetails(id);
    localStorage.setItem('id', JSON.stringify(id));
  }

  render() {
    const {
      prices, productName, gallery, attribute, stock, id,
    } = this.props;

    const selectedPrice = prices.filter((price) => price.selected === true);

    return (
      <div className="products d-flex f-col a-center j-center">
        <Link to={`/product/${id}`} onClick={() => this.viewProduct(id)}>
          <div className="img-link-cont d-flex a-center j-center">
            <img className="product-img" src={gallery[0]} alt="img" />
            {stock || <h2 className="out-of-stock">Out of Stock</h2>}
          </div>

        </Link>
        <div className="product-details d-flex f-col">
          <h3 className="product-name">{productName}</h3>
          <div className="product-price">
            <article>
              {selectedPrice.length > 0
                ? (
                  <p>
                    <span>
                      {selectedPrice[0].currency.symbol}
                    </span>
                    <span>
                      {selectedPrice[0].amount}
                    </span>
                  </p>
                )

                : (
                  <p>
                    <span>
                      {prices[0].currency.symbol}
                    </span>
                    <span>
                      {prices[0].amount}
                    </span>
                  </p>
                )}
            </article>
            <article>
              <Attributes
                attr={attribute}
                inStock={stock}
                pName={productName}
              />
            </article>

          </div>

        </div>

      </div>
    );
  }
}

ProductCard.propTypes = ({
  prices: PropTypes.arrayOf(Object).isRequired,
  productName: PropTypes.string.isRequired,
  gallery: PropTypes.arrayOf(String).isRequired,
  attribute: PropTypes.arrayOf(Object).isRequired,
  stock: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  viewProductDetails: PropTypes.func.isRequired,
});

export default connect(null, mapDispatchToProps())(ProductCard);
