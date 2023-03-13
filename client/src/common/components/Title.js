import React from 'react';
import Logo from '../../logo.svg';
import PropTypes from 'prop-types';

const Title = ({ text }) => (
  <div className="col-12 d-flex align-items-center">
    <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px'}}/>
    <h1 className="mt-4">{text}</h1>
  </div>
);

Title.propTypes = {
  text: PropTypes.string.isRequired
};

export default Title;