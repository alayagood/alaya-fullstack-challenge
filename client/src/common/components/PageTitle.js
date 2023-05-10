import React from 'react';
import Logo from '../../logo.svg';

const PageTitle = ({ title }) => {
    return (
        <div className="mb-5">
            <div className="row">
                <div className="col-12 d-flex align-items-center">
                    <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px'}}/>
                    <h1 className="mt-4">
                        {title}
                    </h1>
                </div>
            </div>
            <hr />
      </div>
    );
};

export default PageTitle;