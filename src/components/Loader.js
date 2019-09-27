import React from 'react';
import LoaderImage from '../assets/Loader.gif'

const Loader = () => {
	return (
    <div className="loader">
      <img  src={LoaderImage} alt="Page is loading"/>
    </div>
	);
};

export default Loader;
