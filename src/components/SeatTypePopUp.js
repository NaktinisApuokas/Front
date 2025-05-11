import React from 'react';
import styles from '../css/Popup.module.css'; // Assuming you have CSS for styling

const SeatTypePopUp = ({ handleClose, children }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={handleClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default SeatTypePopUp;
