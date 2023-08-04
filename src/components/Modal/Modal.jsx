import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import Loader from 'components/Loader/Loader';
import '../../Styles/styles.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, dataImageForModal: { largeImageURL, tags } }) => {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const handlerKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handlerKeyDown);
    return () => {
      window.removeEventListener('keydown', handlerKeyDown);
    };
  }, [onClose]);

  const handlerOnClickClose = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const handlerCloseLoader = () => {
    setLoader(p => !p);
  };

  return createPortal(
    <div className="Overlay" onClick={handlerOnClickClose}>
      <div className="Modal">
        <img src={largeImageURL} alt={tags} onLoad={handlerCloseLoader} />
      </div>
      {loader && <Loader />}
    </div>,
    modalRoot
  );
};

export default Modal;
Modal.protoTypes = {
  onClose: PropTypes.func.isRequired,
  dataImageForModal: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
