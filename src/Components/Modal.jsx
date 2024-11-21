import React from 'react'
import { useState } from 'react';
import '../CSS/Modal.css'



    // Modal.jsx
const Modal = ({ isOpen, onClose, onSubmit }) => {
    const [userId, setUserId] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(userId);
      setUserId('');
      onClose();
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter ID"
              required
            />
            <button type="submit" className='submit-btn'>Submit</button>
            <button type="button" className="cancel-btn"onClick={onClose}>Cancel</button>
          </form>
        </div>
      </div>
    );
  };

export default Modal
