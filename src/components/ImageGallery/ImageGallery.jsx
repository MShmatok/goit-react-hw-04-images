import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import '../../Styles/styles.css';

const ImageGallery = ({ gallery, onClickImage }) => {
  return (
    <>
      <ul className="ImageGallery">
        {gallery.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              tags={tags}
              webformatURL={webformatURL}
              onClickImage={() => {
                onClickImage({ largeImageURL, tags });
              }}
            />
          );
        })}
      </ul>
    </>
  );
};

export default ImageGallery;

ImageGallery.protoTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onClickImage: PropTypes.func.isRequired,
};
