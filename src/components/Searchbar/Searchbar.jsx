import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../Styles/styles.css';

const Searchbar = ({ handlerSubmit }) => {
  const [searchText, setSearchText] = useState('');

  const onChange = e => {
    setSearchText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    handlerSubmit(searchText);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmit}>
        <button type="submit" onSubmit={onSubmit} className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          name="search"
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          value={searchText}
          placeholder="Search images and photos"
          onChange={onChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.protoTypes = {
  handlerSubmit: PropTypes.func.isRequired,
};
