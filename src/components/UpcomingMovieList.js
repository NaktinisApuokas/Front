import React, { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import withLoading from '../HOCs/withLoading';
import styles from './UpcomingMovieList.module.css';
import { 
  Card,
  CardActions,
  IconButton,
  Typography,
  Button, 
  Box, 
  CardContent, 
  CardMedia, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  TextField } from '@mui/material';
import MovieEditButton from './MovieEditButton';
import MovieDeleteButton from './MovieDeleteButton';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { AuthContext } from '../App';
import axios from 'axios';
import routes from '../constants/routes';


function UpcomingMovieList({movies, url, deleteUrl, onDelete}) {
  const [selectedCategory, setSelectedCategory] = useState("Visi");
  const [arrayToFilter, setArrayToFilter] = useState(movies);
  const [selectedTime, setSelectedTime] = useState();

  const [showTrailer, setShowTrailer] = useState(false);
  const { role } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState('');

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function filterGenre(array) {
    if (!selectedCategory || selectedCategory === "Visi") {
      return array;
    }
    return array.filter((movie) => movie.genre.toLowerCase().includes(selectedCategory.toLowerCase()));
  }

  const toggleTrailer = (id) => {
    setShowTrailer(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    let result = movies;
    result = filterGenre(result);
    result = result.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setArrayToFilter(result);
  }, [selectedCategory, searchTerm, movies]);

  useEffect(() => {
    let result = arrayToFilter;
    
    if(selectedTime === "Artimiausi"){
      result.sort((a,b)=> a.screenings[0].time > b.screenings[0].time ? -1 : 1,)
    }
    if(selectedTime === "Tolimiausi"){
      result.sort((a,b)=> a.screenings[0].time > b.screenings[0].time ? 1 : -1,)
    }
    
    setArrayToFilter(result);
  }, [arrayToFilter, selectedTime]);
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (movieid) => {

    const movieMark = {
      username: role
    };
    axios.post(`${routes}/cinemas/1/movies/${movieid}/movieMark`, movieMark)
      .catch(error => console.log(error));
  };

  const handleDelete = (movieid) => {
    const username = role;

    axios.delete(`${routes}/cinemas/1/movies/${movieid}/movieMark?username=${username}`)
      .catch(error => console.log(error));
  };

  return (
    <div className={styles.BackGround}>
      {(role === 'admin') && (
      <Box className={styles.AddButton}>
        <Link to="/add_upcomingMovie"><button className="btn btn-light text-dark btn-lg w-40"> Pridėti filmą </button></Link>
      </Box>
      )}
      <Box className={styles.Box}>
        <TextField
          label="Paieška"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Typography variant="subtitle1" color="text.secondary" className={styles.FilterText}>
          <b>Filtruoti: </b>
        </Typography>
        <FormControl className={styles.Filter} >
          <InputLabel id="demo-simple-select-label">Žanras</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCategory}
            label="Žanras"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">Visi</MenuItem>
            <MenuItem value="Animacija">Animacija</MenuItem>
            <MenuItem value="Nuotykių">Nuotykių</MenuItem>
            <MenuItem value="Romantinis">Romantinis</MenuItem>
            <MenuItem value="Drama">Drama</MenuItem>
            <MenuItem value="Fantastinis">Fantastinis</MenuItem>
            <MenuItem value="Siaubo">Siaubo</MenuItem>
            <MenuItem value="Šeimos">Šeimos</MenuItem>
            <MenuItem value="Trileris">Trileris</MenuItem>
            <MenuItem value="Veiksmo">Veiksmo</MenuItem>
            <MenuItem value="Komedija">Komedija</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {movies.length === 0 ?  <div className={styles.FullBackGround} ><button className="btn btn-light text-dark btn-lg w-40"> Nėra filmų </button></div>
          :
          arrayToFilter.map((movie) => (
          <Card className={styles.Card}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }} >
                  <CardMedia
                    className={styles.Photo}
                    image={movie.img}
                    sx={{ objectFit: "fill", width: '15em', flex: '0 0 auto' }}
                  />
                  <CardContent
                    sx={{ flex: '1 1 auto', p: 0, display: 'flex', flexDirection: 'column' }}
                    className={styles.CardContent}
                  >
                  <Typography variant="h3" className={styles.MovieGenre}>
                    {movie.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary"  className={styles.MovieGenre}>
                    {movie.titleEng}
                  </Typography>
                  <Box className={styles.GenreRow}>
                    <Typography variant="subtitle1" color="text.secondary" className={styles.MovieGenre}>
                      <b>Žanras: </b>{movie.genre}
                    </Typography>
                  {movie.trailerURL && (
                    <Button
                      className={styles.TrailerButton}
                      onClick={() => toggleTrailer(movie.id)}
                      startIcon={<PlayArrowRoundedIcon sx={{ color: 'black' }} />}
                    >
                      Žiūrėti anonsą
                    </Button>
                  )}
                  </Box>

                  <Box sx={{ mt: 'auto' }}>
                    <Typography variant="h4" className={styles.Date}>
                      <b>Kinuose nuo: {movie.date}</b>
                    </Typography>
                  </Box>
                  {showTrailer[movie.id] && (
                    <Box className={styles.TrailerOverlay}>
                      <Box className={styles.YoutubeCard}>
                        <button className={styles.CloseButton} onClick={() => toggleTrailer(movie.id)}>✖</button>
                        <iframe
                          width="1120"
                          height="630"
                          src={movie.trailerURL}
                          title={`${movie.title} trailer`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </Box>
                    </Box>
                  )}
                  </CardContent>
                  <CardActions sx={{ flex: '0 1 auto' }} className={styles.CardActions}>
                  {(role === 'admin') && (
                    <>
                      <IconButton >
                        <MovieEditButton linkstate={{movie}} url={'/edit_upcomingmovie'}/>
                      </IconButton>
                      <IconButton >
                        <MovieDeleteButton url={deleteUrl + movie.id}  onDelete={onDelete}/>
                      </IconButton>
                    </>
                  )}
                </CardActions>
                </Box>
            </Card>
          ))
        }
      </Box>
    </div>
  );
}

export default withLoading(UpcomingMovieList);