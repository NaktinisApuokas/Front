import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../constants/routes';
import {
  Box,
  Card,
  Typography
} from '@mui/material';
import allStyles from '../css/styles.module.css';
import styles from './AuthForm.module.css';

export default function CinemaForm({ title }) {
  const [formData, setFormData] = useState({
    name: '',
    img: '',
    address: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const cinema = location.state;

  useEffect(() => {
    if (title === 'Redaguoti' && cinema) {
      setFormData({
        name: cinema.name || '',
        img: cinema.img || '',
        address: cinema.address || ''
      });
    }
  }, [title, cinema]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setError('');
  };

  const isValidImageUrl = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.address.trim()) {
      setError('Adresas yra privalomas.');
      return;
    }

    if (!formData.img.trim()) {
      setError('Nuotraukos URL yra privalomas.');
      return;
    }
  
    const validImage = await isValidImageUrl(formData.img);
    if (!validImage) {
      setError('Neteisingas nuotraukos URL. Įveskite galiojantį paveikslėlį.');
      return;
    }

    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: formData.address,
          key: 'AIzaSyDkHdhPddPL7Hckk65jEcm3SAsri83VzyY', 
        },
      });

      const location = response.data.results[0]?.geometry.location;
      console.log(response);
      console.log(location);
      if (!location) {
        setError('Adresas nerastas. Įveskite galiojantį adresą.');
        return;
      }

      const cinemaToBack = {
        name: formData.name,
        img: formData.img,
        address: formData.address,
        lat: location.lat.toString(),
        lon: location.lng.toString()
      };

      if (title === 'Redaguoti') {
        await axios.put(`${routes}/cinemas/${cinema.id}`, cinemaToBack);
      } else {
        await axios.post(`${routes}/cinemas`, cinemaToBack);
      }

      navigate('/');
    } catch (err) {
      console.error('Klaida:', err);
      setError('Įvyko klaida. Bandykite dar kartą.');
    }
  };

  return (
    <Box className={allStyles.NewBackGroundColor}>
      <Card className={allStyles.FormCard}>
        <Typography className={styles.Title} variant="h2">
          {title} kino teatrą
        </Typography>
        <Box className={styles.FormBox}>
          <form className={styles.FormWidth} onSubmit={handleSubmit}>
            <div className="mt-5">
              <label className="h3 form-label">Kino teatro pavadinimas</label>
              <input
                value={formData.name}
                name="name"
                type="text"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="mt-5">
              <label className="h3 form-label">Kino teatro nuotrauka</label>
              <input
                value={formData.img}
                name="img"
                type="text"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            {formData.img && (
              <div className="mt-3">
                <img src={formData.img} alt="Preview" style={{ maxWidth: '200px' }} />
              </div>
            )}

            <div className="mt-5">
              <label className="h3 form-label">Kino teatro adresas</label>
              <input
                value={formData.address}
                name="address"
                type="text"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            {error && (
              <div className="mt-3 alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <button className="btn btn-dark btn-lg w-100 mt-5" type="submit">
              Patvirtinti
            </button>
          </form>
        </Box>
      </Card>
    </Box>
  );
}
