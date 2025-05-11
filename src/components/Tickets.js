import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import allStyles from '../css/styles.module.css';
import { 
  Box,
  Card,
  Typography
 } from '@mui/material';
 import styles from './Tickets.module.css';
 import { AuthContext } from '../App';
 import routes from '../constants/routes';
 import QRCode from 'react-qr-code';

export default function Tickets() {
  const { role, setRole } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`${routes}/screening/1/Ticket`, {
        params: {
          Username: role
        }
      });
      setTickets(response.data);
    } catch (error) {
      console.error("Failed to fetch tickets", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <Box className={allStyles.NewBackGroundColor}>
      <Box>
        <h1 className={styles.Text}>Bilietai</h1>
        {tickets.length === 0 ? (
          <Box style={{ marginTop: '2em', color: 'white', fontSize: '1.2rem' }}>
            Bilietų nerasta.
          </Box>
        ) : (
          <div className={styles.CardContainer}>
            {tickets.map((ticket, index) => (
              <Card key={index} className={styles.Card}>
                <div className={styles.TicketInfo}>
                  <Typography className={styles.Title} variant="h3">
                    {ticket.movieTitle}
                  </Typography>
                  <Typography className={styles.Title} variant="h5">
                    {ticket.movieTitleEng}
                  </Typography>
                  <Typography className={styles.Title} variant="h5">
                    {ticket.cinemaName}
                  </Typography>
                  <Typography className={styles.Title} variant="h5">
                    {ticket.screeningDateTime}
                  </Typography>
                  {ticket.row} eilė, {ticket.col} vieta
                  <Typography className={styles.Title} variant="h5">
                    Kaina: {ticket.price} €
                  </Typography>
                </div>
                <div className={styles.QR}>
                  <QRCode
                    value={`Movie: ${ticket.movieTitleEng}, Time: ${ticket.screeningDateTime}, Seat: ${ticket.row}-${ticket.col}`}
                    size={100}
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                  />
                </div>
              </Card>
            ))}
          </div>
        )}
      </Box>
    </Box>
  );
}
