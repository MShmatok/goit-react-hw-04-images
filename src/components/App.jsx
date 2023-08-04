import React, { useState, useEffect, useCallback } from 'react';
import '../Styles/styles.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Application from 'service/Application';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import { animateScroll } from 'react-scroll';
import { useRef } from 'react';

const PER_PAGE = 12;
const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
  IDLE: 'IDLE',
};

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [messageError, setMessageError] = useState('');
  const [dataImageForModal, setDataImageForModal] = useState(null);
  const firstRun = useRef(true);

  const getGallery = useCallback(async () => {
    try {
      setStatus(STATUS.PENDING);
      const data = await Application.getImages(searchText, page);

      setGallery(p => [...p, ...data.hits]);
      setTotalHits(data.totalHits);
      setStatus(STATUS.FULFILLED);

      if (data.hits.length === 0) {
        throw new Error('Щось пішло не так. Спробуй інший запит...');
      }
    } catch (error) {
      setStatus(STATUS.REJECTED);
      setMessageError(error.message);
    }
  }, [page, searchText]);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    getGallery();
  }, [searchText, page, getGallery]);

  const handlerSubmit = searchTextSub => {
    if (searchText === searchTextSub) {
      return;
    }
    setSearchText(searchTextSub);
    setPage(1);
    setTotalHits(0);
    setGallery([]);
  };

  const handlerLoadMore = () => {
    setPage(p => p + 1);
    animateScroll.scrollMore(500);
  };

  const handelModal = (modalData = null) => {
    setDataImageForModal(modalData);
  };

  return (
    <>
      <Searchbar handlerSubmit={handlerSubmit} />
      <ImageGallery gallery={gallery} onClickImage={handelModal} />
      {status === 'PENDING' && <Loader />}
      {status === 'REJECTED' && <h1>{messageError}</h1>}
      {totalHits / PER_PAGE >= page && <Button onClick={handlerLoadMore} />}
      {dataImageForModal && (
        <Modal onClose={handelModal} dataImageForModal={dataImageForModal} />
      )}
    </>
  );
};

export { App };
