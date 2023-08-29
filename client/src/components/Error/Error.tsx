import React from 'react';

interface IErrorProps {
    error: string
}

const Error: React.FC<IErrorProps> = ({error}): JSX.Element => {

  return (
    <div className="d-flex flex-column w-100">
        <div className="alert">{error}</div>
    </div>
  );
}

export default Error;