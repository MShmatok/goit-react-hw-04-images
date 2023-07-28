import React, { Component } from 'react';
import App from 'service/Application';
import { animateScroll } from 'react-scroll';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

import '../../Styles/styles.css';

const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
  IDLE: 'IDLE',
};

class ImageGallery extends Component {
  state = {
    gallery: [],
    page: 1,
    perPage: 12,
    totalHits: 0,
    status: STATUS.IDLE,
    messageError: '',
    showModal: false,
    dataImageForModal: { largeImageURL: '', tags: '' },
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.handlerPage();
    }
    if (prevProps.searchText !== this.props.searchText) {
      this.handlerNewSearch();
    }
  }

  handlerPage = async () => {
    const { page, perPage } = this.state;
    const { searchText } = this.props;
    try {
      this.setState({ status: STATUS.PENDING });
      const data = await App.getImages(searchText, page, perPage);

      this.setState(prevState => {
        return {
          gallery:
            prevState.page === 1
              ? data.hits
              : [...prevState.gallery, ...data.hits],
          totalHits: data.totalHits,
          status: STATUS.FULFILLED,
        };
      });
      if (data.hits.length === 0) {
        throw new Error('Щось пішло не так. Спробуй інший запит...');
      }
    } catch (error) {
      this.setState({ status: STATUS.REJECTED, messageError: error.message });
    }
  };

  handlerNewSearch = async () => {
    const { perPage } = this.state;
    const { searchText } = this.props;

    try {
      this.setState({ status: STATUS.PENDING });
      const data = await App.getImages(searchText, 1, perPage);

      this.setState(prevState => {
        return {
          page: 1,
          gallery:
            prevState.page === 1
              ? data.hits
              : [...prevState.gallery, ...data.hits],
          totalHits: data.totalHits,
          status: STATUS.FULFILLED,
        };
      });
      if (data.hits.length === 0) {
        throw new Error('Щось пішло не так. Спробуй інший запит...');
      }
    } catch (error) {
      this.setState({ status: STATUS.REJECTED, messageError: error.message });
    }
  };
  handlerLoadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      () => {
        animateScroll.scrollMore(500);
      }
    );
  };
  handelModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };
  onClickImage = (largeImageURL, tags) => {
    this.setState({
      showModal: true,
      dataImageForModal: { largeImageURL, tags },
    });
  };
  render() {
    const {
      page,
      perPage,
      totalHits,
      gallery,
      status,
      showModal,
      dataImageForModal,
      messageError,
    } = this.state;
    const { PENDING, REJECTED } = STATUS;
    return (
      <>
        <ul className="ImageGallery">
          {gallery.map(({ id, webformatURL, largeImageURL, tags }) => {
            return (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                onClickImage={() => {
                  this.onClickImage(largeImageURL, tags);
                }}
              />
            );
          })}
        </ul>

        {status === PENDING && <Loader />}
        {status === REJECTED && <h1>{messageError}</h1>}
        {totalHits / perPage >= page && (
          <Button onClick={this.handlerLoadMore} />
        )}
        {showModal && (
          <Modal
            onClose={this.handelModal}
            dataImageForModal={dataImageForModal}
          />
        )}
      </>
    );
  }
}

export default ImageGallery;
