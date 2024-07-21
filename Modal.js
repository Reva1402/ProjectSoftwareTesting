import React from 'react';
import './FinalProject.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h4 className="close-btn" onClick={onClose}>X</h4>
        {children}
      </div>
    </div>
  );
}

export default Modal;
