import React from "react";

const Modal = ({ imageUrl, closeModal }) => {
  return (
    <div className="image-modal">
      <span className="close" onClick={closeModal}>&times;</span>
      <img src={imageUrl} alt="Modal Image" className="modal-image" />
    </div>
  );
};

export default Modal;