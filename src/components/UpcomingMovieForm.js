import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../constants/routes';
import { 
  Box, 
  Card, 
  Typography,
  TextField 
} from '@mui/material';
import allStyles from '../css/styles.module.css';
import styles from './UpcomingMovieForm.module.css';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/lt';

export default function UpcomingMovieForm({ title }) {
  const location = useLocation();
  const movie = location?.state?.movie || null;
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    titleEng: '',
    genre: '',
    img: '',
    duration: '',
    date: '',
    description: '',
    trailerURL: ''
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title || '',
        titleEng: movie.titleEng || '',
        genre: movie.genre || '',
        img: movie.img || '',
        duration: movie.duration || '',
        date: movie.date || '',
        description: movie.description || '',
        trailerURL: movie.trailerURL || ''
      });
    }
  }, [title, movie]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
    setError('');
  };

  const handleDateChange = (newDate) => {
    setFormData(prev => ({
      ...prev,
      date: newDate ? newDate.format('YYYY-MM-DD') : ''
    }));
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

    if (!formData.img.trim()) {
      setError('Nuotraukos URL yra privalomas.');
      return;
    }
  
    const validImage = await isValidImageUrl(formData.img);
    if (!validImage) {
      setError('Neteisingas nuotraukos URL. Įveskite galiojantį paveikslėlį.');
      return;
    }

    const movietocreate = {
      title: formData.title,
      titleEng: formData.titleEng,
      genre: formData.genre,
      img: formData.img,
      duration: formData.duration,
      date: formData.date,
      description: formData.description,
      trailerURL: formData.trailerURL
    };
 
    if (title === "Redaguoti") {
      axios.put(`${routes}/cinemas/1/movies/${movie.id}/Upcoming`, movietocreate)
        .catch(error => console.log(error));
    } else {
      axios.post(`${routes}/cinemas/1/movies/Upcoming`, movietocreate)
        .catch(error => console.log(error));
    }
    navigate('/upcoming');
  };

  return (
    <Box className={allStyles.NewBackGroundColor}>
      <Card className={allStyles.FormCard}>
        <Typography 
          variant="h2" 
          sx={{ ml: '1em', pt: '0.5em' }}>
          {title} artėjantį filmą
        </Typography>
        <Box className={styles.FormBox}>
          <form className="w-100 px-5" onSubmit={handleSubmit}>
            <div className="mt-5">
              <label className="h3 form-label">Pavadinimas</label>
              <input value={formData.title} name="title" type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className="mt-5">
              <label className="h3 form-label">Originalus Pavadinimas</label>
              <input value={formData.titleEng} name="titleEng" type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className="mt-4">
              <label className="h3 form-label">Žanras</label>
              <input value={formData.genre} name="genre" type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className="mt-4">
              <label className="h3 form-label">Nuotrauka</label>
              <input value={formData.img} name="img" type="text" className="form-control" onChange={handleChange} />
            </div>

            {formData.img && (
              <div className="mt-3">
                <img src={formData.img} alt="Preview" style={{ maxWidth: '200px' }} />
              </div>
            )}

            <div className="mt-4">
              <label className="h3 form-label">Trukmė</label>
              <input value={formData.duration} name="duration" type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className="mt-4">
              <label className="h3 form-label">Anonso nuoroda</label>
              <input value={formData.trailerURL} name="trailerURL" type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className="mt-4">
              <label className="h3 form-label">Kinuose nuo</label>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="lt">
                <DatePicker
                  label="Pasirinkite datą"
                  value={formData.date ? dayjs(formData.date) : null}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="duration"
                      fullWidth
                      className="form-control"
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div className="mt-4">
              <label className="h3 form-label">Aprašymas</label>
              <textarea
                value={formData.description}
                name="description"
                className="form-control"
                onChange={handleChange}
                rows="4"
              />
            </div>

            {error && (
              <div className="mt-3 alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-dark btn-lg w-100 mt-5">Patvirtinti</button>
          </form>
        </Box>
      </Card>
    </Box>
  );
}
