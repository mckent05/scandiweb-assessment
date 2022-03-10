/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImagePreview extends Component {
  render() {
    const { image } = this.props;

    return (
      <div className="preview-desc-cont">
        <img src={image} alt="product-img" className="preview-img" />
      </div>

    );
  }
}

ImagePreview.propTypes = ({
  image: PropTypes.string.isRequired,
});

export default ImagePreview;
