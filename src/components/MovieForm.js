import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../constants/routes';
import { 
  Box, 
  Card, 
  Typography 
} from '@mui/material';
import allStyles from '../css/styles.module.css';
import styles from './CinemaForm.module.css';

export default function MovieForm({ title }) {
  const location = useLocation();
  const id = location.state.type;
  const { movie } = location.state;

  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    img: '',
    duration: '',
    description: ''
  });

  useEffect(() => {
    if (title === "Redaguoti" && movie) {
      setFormData({
        title: movie.title || '',
        genre: movie.genre || '',
        img: movie.img || '',
        duration: movie.duration || '',
        description: movie.description || ''
      });
    }
  }, [title, movie]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title === "Redaguoti") {
      const movietoedit = {
        description: formData.description
      };
      axios.put(`${routes}/cinemas/${id}/movies/${movie.id}`, movietoedit)
        .catch(error => console.log(error));
    } else {
      const movietocreate = {
        title: formData.title,
        genre: formData.genre,
        img: formData.img,
        duration: formData.duration,
        description: formData.description
      };
      axios.post(`${routes}/cinemas/${id}/movies`, movietocreate)
        .catch(error => console.log(error));
    }
    navigate('/movies', { state: { type: id } });
  };

  return (
    <Box className={allStyles.NewBackGroundColor}>
      <Card className={allStyles.FormCard}>
        <Typography className={styles.Title} variant="h2">{title} filmą
        </Typography>
        <Box className={styles.FormBox}>
          <form className="w-100 px-5" onSubmit={handleSubmit}>
            {title === "Sukurti" && (
              <>
                <div className="mt-5">
                  <label className="h3 form-label">Filmo pavadinimas</label>
                  <input value={formData.title} name="title" type="text" className="form-control" onChange={handleChange} />
                </div>
                <div className="mt-4">
                  <label className="h3 form-label">Filmo žanras</label>
                  <input value={formData.genre} name="genre" type="text" className="form-control" onChange={handleChange} />
                </div>
                <div className="mt-4">
                  <label className="h3 form-label">Filmo nuotrauka</label>
                  <input value={formData.img} name="img" type="text" className="form-control" onChange={handleChange} />
                </div>
                <div className="mt-4">
                  <label className="h3 form-label">Filmo trukmė</label>
                  <input value={formData.duration} name="duration" type="text" className="form-control" onChange={handleChange} />
                </div>
              </>
            )}
            
            <div className="mt-4">
              <label className="h3 form-label">Filmo aprašymas</label>
              <textarea
                value={formData.description}
                name="description"
                className="form-control"
                onChange={handleChange}
                rows="4"
              />
            </div>

            <button type="submit" className="btn btn-dark btn-lg w-100 mt-5">Patvirtinti</button>
          </form>
        </Box>
      </Card>
    </Box>
  );
}
