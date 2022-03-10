/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disbale react/prefer-stateless-function */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { controlImage } from '../../../Redux/PLP/listingPage';

const mapStateToProps = (state) => ({
  myState: state.productList,
});

const mapDispatchToProps = () => ({
  controlImage,
});

class ProductImage extends Component {
  scrollPicture(action, length) {
    const details = { action, length };
    const { controlImage } = this.props;
    controlImage(details);
  }

  render() {
    const { imgGallery, myState: { imageControl } } = this.props;

    return (
      <div className="desc-img-cont">
        <img src={imgGallery[imageControl]} alt="product-img" className="desc-img" />
        <div className="img-view-control d-flex a-center">
          <button type="button" className="left arrow-left" onClick={(e) => this.scrollPicture(e.currentTarget.classList[0], imgGallery.length)}><FaArrowCircleLeft /></button>
          <button type="button" className="right arrow-left" onClick={(e) => this.scrollPicture(e.currentTarget.classList[0], imgGallery.length)}><FaArrowCircleRight /></button>
        </div>
      </div>

    );
  }
}

ProductImage.propTypes = ({
  imgGallery: PropTypes.arrayOf(String).isRequired,
  myState: PropTypes.objectOf(String).isRequired,
  imageControl: PropTypes.number,
  controlImage: PropTypes.func.isRequired,
});

ProductImage.defaultProps = ({
  imageControl: 0,
});

export default connect(mapStateToProps, mapDispatchToProps())(ProductImage);
