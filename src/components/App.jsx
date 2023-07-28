import React, { Component } from 'react';
import '../Styles/styles.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = { searchText: '' };
  handlerSubmit = searchText => {
    this.setState({ searchText });
  };
  render() {
    return (
      <>
        <Searchbar handlerSubmit={this.handlerSubmit} />
        <ImageGallery searchText={this.state.searchText} />
      </>
    );
  }
}

export { App };
