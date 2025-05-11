import styles from './PaymentModal.module.css';
import React from 'react';
import axios from 'axios';
import routes from '../constants/routes';
import { 
  Box
 } from '@mui/material';

export default function PaymentModal({ screeningId, screeningInfo, onClose, selectedSeats, submit }) {
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const mappedSeats = selectedSeats.map(seat => ({ 
      id: seat.data.id,
      location: seat.key,
      defaultPrice: seat.data.defaultPrice
    }));

    const payload = {
      seats: mappedSeats,
      screeningId: screeningId,
      movieTitle: screeningInfo.movieTitle,
      movieTitleEng: screeningInfo.movieTitleEng, 
      cinemaName: screeningInfo.cinemaName,
      screeningDateTime: screeningInfo.screeningDateTime
    };

    try {
      const response = await axios.post(`${routes}/payment/create-checkout-session`, payload);

      window.location.href = response.data.sessionUrl;
    } catch (error) {
      console.error("Stripe error:", error);
    }
  };


  if (!screeningId) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.content}>
        <button onClick={onClose} className={styles.closeButton}>
          X
        </button>
        <Box className={styles.FormBox}>
          <form className={styles.FormWidth}>
            <div style={{ marginTop: "20px", fontSize: "16px" }}>
              <strong>Vietų kiekis:</strong> {selectedSeats.length} <br />
              <strong>Bendra kaina:</strong> € {selectedSeats.reduce((sum, seat) => sum + seat.data.defaultPrice, 0).toFixed(2)}
            </div>
            <button className="btn btn-dark btn-lg w-100 mt-5" onClick={handleSubmit}>Mokėti</button>
          </form>
        </Box>
      </div>
    </div>
  );
}