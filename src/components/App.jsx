import React, { Component } from 'react';
import '../Styles/styles.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Application from 'service/Application';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import { animateScroll } from 'react-scroll';

const PER_PAGE = 12;
const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
  IDLE: 'IDLE',
};

class App extends Component {
  state = {
    searchText: '',
    gallery: [],
    page: 1,
    totalHits: 0,
    status: STATUS.IDLE,
    messageError: '',
    dataImageForModal: null,
  };
  handlerSubmit = searchText => {
    this.setState({ searchText, page: 1, totalHits: 0, gallery: [] });
  };

  componentDidUpdate(_, prevState) {
    const { page, searchText } = this.state;
    if (prevState.page !== page || prevState.searchText !== searchText) {
      this.getGallery();
    }
  }

  getGallery = async () => {
    const { page, searchText } = this.state;

    try {
      this.setState({ status: STATUS.PENDING });
      const data = await Application.getImages(searchText, page);

      this.setState(prevState => {
        return {
          gallery: [...prevState.gallery, ...data.hits],
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

  handelModal = (modalData = null) => {
    this.setState({
      dataImageForModal: modalData,
    });
  };

  render() {
    const {
      gallery,
      totalHits,
      page,
      status,
      messageError,
      dataImageForModal,
    } = this.state;
    return (
      <>
        <Searchbar handlerSubmit={this.handlerSubmit} />
        <ImageGallery gallery={gallery} onClickImage={this.handelModal} />
        {status === 'PENDING' && <Loader />}
        {status === 'REJECTED' && <h1>{messageError}</h1>}
        {totalHits / PER_PAGE >= page && (
          <Button onClick={this.handlerLoadMore} />
        )}
        {dataImageForModal && (
          <Modal
            onClose={this.handelModal}
            dataImageForModal={dataImageForModal}
          />
        )}
      </>
    );
  }
}

export { App };
