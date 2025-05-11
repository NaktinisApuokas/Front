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
  const [error, setError] = useState('');
  const id = location.state.type;
  const { movie } = location.state;

  const [formData, setFormData] = useState({
    title: '',
    titleEng: '',
    genre: '',
    img: '',
    duration: '',
    description: '',
    trailerURL: ''
  });

  useEffect(() => {
    if (title === "Redaguoti" && movie) {
      setFormData({
        title: movie.title || '',
        titleEng: movie.titleEng || '',
        genre: movie.genre || '',
        img: movie.img || '',
        duration: movie.duration || '',
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

    var cinemaId = id;

    if(!cinemaId){
      cinemaId = 1;
    }

    if (title === "Redaguoti") {
      const movietoedit = {
        description: formData.description,
        trailerURL: formData.trailerURL
      };
      axios.put(`${routes}/cinemas/${cinemaId}/movies/${movie.id}`, movietoedit)
        .catch(error => console.log(error));
    } else {
      const movietocreate = {
        title: formData.title,
        titleEng: formData.titleEng,
        genre: formData.genre,
        img: formData.img,
        duration: formData.duration,
        description: formData.description,
        trailerURL: formData.trailerURL
      };
      axios.post(`${routes}/cinemas/${cinemaId}/movies`, movietocreate)
        .catch(error => console.log(error));
    }
    if(!id){
      navigate('/allmovies');
    }
    else{
      navigate('/movies', { state: { type: cinemaId } });
    }
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
                <div className="mt-5">
                  <label className="h3 form-label">Originalus pavadinimas</label>
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
              </>
            )}
            
            <div className="mt-4">
              <label className="h3 form-label">Anonso nuoroda</label>
              <input value={formData.trailerURL} name="trailerURL" type="text" className="form-control" onChange={handleChange} />
            </div>
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
