import React, { Component } from 'react';
import '../../Styles/styles.css';

class Searchbar extends Component {
  state = { searchText: '' };
  onChange = e => {
    this.setState({ searchText: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.handlerSubmit(this.state.searchText);
    // this.setState({ searchText: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmit}>
          <button
            type="submit"
            onSubmit={this.onSubmit}
            className="SearchForm-button"
          >
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            name="search"
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.searchText}
            placeholder="Search images and photos"
            onChange={this.onChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
