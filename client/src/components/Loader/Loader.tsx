import React from 'react';
import loader from '../../assets/loader.svg'
import './Loader.css'

const Loader: React.FC =(): JSX.Element => {

  return (
    <div className="loader d-flex flex-column w-100">
        <img width="50" src={loader} alt="Loading..." />
    </div>
  );
}

export default Loader;