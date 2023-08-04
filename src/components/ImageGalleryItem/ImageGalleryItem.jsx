import React from 'react';
import PropTypes from 'prop-types';
import '../../Styles/styles.css';

const ImageGalleryItem = ({ webformatURL, tags, onClickImage }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt={tags}
        onClick={onClickImage}
      />
    </li>
  );
};

export default ImageGalleryItem;
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  onClickImage: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};
