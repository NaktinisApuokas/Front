import React, { useContext, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useSearchParams  } from 'react-router-dom';
import routes from '../constants/routes';
import axios from 'axios';
import { AuthContext } from '../App';

export default function PaymentSuccess() {
  const { role, setRole } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    const fetchSession = async () => {
      try {
        const sessionRes = await axios.get(`${routes}/payment/session/${sessionId}`);
        const { screeningId, username, seats } = sessionRes.data;

        console.log(sessionRes.data);
        setRole(username);
        const payload = {
          Username: username,
          SelectedSeats: seats.map(seat => ({
            id: seat.id, 
            defaultPrice: seat.defaultPrice,
            location: seat.location
          }))
        };

        await axios.post(`${routes}/screening/${screeningId}/Ticket`, payload);
      } catch (error) {
        console.error("Ticket creation failed:", error);
      }
    };

    if (sessionId) {
      fetchSession();
    }
  }, [searchParams]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 500, width: '100%', p: 4, textAlign: 'center', borderRadius: 4 }}>
        <CardContent>
          <CheckCircleIcon sx={{ fontSize: 60, color: 'green', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Apmokėjimas sėkmingas!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Dėkojame, kad įsigijote bilietus. Bilietai bus išsiųsti į jūsų el. paštą.
          </Typography>
          <Typography variant="body2" sx={{ mb: 4 }}>
            Linkime puikaus kino seanso! 🎬
          </Typography>
          <Button variant="contained" color="primary" fullWidth onClick={handleBackHome}>
            Grįžti į pradžią
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
