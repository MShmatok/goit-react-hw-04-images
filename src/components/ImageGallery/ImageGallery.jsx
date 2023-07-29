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
  searchText: PropTypes.string.isRequired,
};
