/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImagePreview from './ImagePreview';
import ProductImage from './ProductImage';
import ProductDescAttributes from './ProductDescAttributes';
import './pdp.css';

class ProductDescPage extends Component {
  render() {
    const { products } = this.props;

    const id = JSON.parse(localStorage.getItem('id'));

    const viewedProduct = products[0].products.filter((item) => item.id === id);

    return (
      <div className="product-desc-cont">
        <section className="poduct-desc-page d-flex j-center">
          <div className="img-preview-cont">
            {
                    viewedProduct[0].gallery.map((img) => (
                      <ImagePreview
                        key={img}
                        image={img}
                      />
                    ))
                }
          </div>
          <div className="poduct-desc-img">
            <ProductImage
              imgGallery={viewedProduct[0].gallery}
            />
          </div>
          <div className="product-desc-attr d-flex f-col">
            <ProductDescAttributes
              inStock={viewedProduct[0].inStock}
              price={viewedProduct[0].prices}
              desc={viewedProduct[0].description}
              attr={viewedProduct[0].attributes}
              pName={viewedProduct[0].name}
            />
          </div>
        </section>

      </div>

    );
  }
}

ProductDescPage.propTypes = ({
  products: PropTypes.arrayOf(Object).isRequired,
});

export default ProductDescPage;
