import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../Styles/styles.css';

class ImageGalleryItem extends Component {
  state = {};
  render() {
    return (
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={this.props.webformatURL}
          alt={this.props.tags}
          onClick={this.props.onClickImage}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  onClickImage: PropTypes.func.isRequired,
};
