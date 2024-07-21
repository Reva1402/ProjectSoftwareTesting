import React from 'react';
import './Modal.css';

const UpdateModal = ({ isUpdateModalOpen, onUpdateModalClose, children }) => {
  if (!isUpdateModalOpen) return null;

  return (
    <div className="updatemodal-overlay">
      <div className="updatemodal">
        <h4 className="close-btn" onClick={onUpdateModalClose}>X</h4>
        {children}
      </div>
    </div>
  );
}

export default UpdateModal;
