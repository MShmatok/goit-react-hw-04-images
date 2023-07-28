import React from 'react';
import PropTypes from 'prop-types';
import '../../Styles/styles.css';

function Button({ onClick }) {
  return (
    <div className="ButtonContainer">
      <button className="Button" onClick={onClick}>
        Load more...
      </button>
    </div>
  );
}

export default Button;

Button.protoTypes = {
  onClick: PropTypes.func.isRequired,
};
