import React, { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import withLoading from '../HOCs/withLoading';
import styles from './MovieList.module.css';
import { Card,
  Typography,
  Box,
  CardContent,
  CardMedia,
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  IconButton,
  CardActions,
  TextField,
  Button } from '@mui/material';
import MovieEditButton from './MovieEditButton';
import MovieDeleteButton from './MovieDeleteButton';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { AuthContext } from '../App';

function AllMoviesList({movies, url, deleteUrl, id, onDelete}) {
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedPrice, setSelectedPrice] = useState();
  const [arrayToFilter, setArrayToFilter] = useState(movies);
  const { role } = useContext(AuthContext);
  const [showTrailer, setShowTrailer] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleTrailer = (id) => {
    setShowTrailer(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  function handleCityChange(event) {
    setSelectedCity(event.target.value);
  }
  function handleTimeChange(event) {
    setSelectedTime(event.target.value);
  }
  function handlePriceChange(event) {
    setSelectedPrice(event.target.value);
  }

  function filterGenre(array) {
    if (!selectedCategory || selectedCategory === "Visi") {
      return array;
    }
    return array.filter((movie) => movie.genre.toLowerCase().includes(selectedCategory.toLowerCase()));
  }
  function filterCity(array) {
    if (!selectedCity || selectedCity === "Visi") {
      return array;
    }
    return array.filter((movie) => movie.cinema.name.includes(selectedCity));
  }

  useEffect(() => {
    let result = movies;
    result = filterGenre(result);
    result = filterCity(result);
    result = result.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setArrayToFilter(result);
}, [selectedCategory, selectedCity, searchTerm]);

useEffect(() => {
  let result = arrayToFilter;
  
  if(selectedTime === "Artimiausi"){
    result.sort((a,b)=> a.screenings[0].time > b.screenings[0].time ? -1 : 1,)
  }
  if(selectedTime === "Tolimiausi"){
    result.sort((a,b)=> a.screenings[0].time > b.screenings[0].time ? 1 : -1,)
  }
  
  setArrayToFilter(result);
}, [selectedTime]);

useEffect(() => {
  let result = arrayToFilter;
  if(selectedPrice === "Pigiausi"){
    result.sort((a,b)=> parseFloat(a.screenings[0].price.split(' ')[0]) > parseFloat(b.screenings[0].price.split(' ')[0]) ? -1 : 1,)
  }
  if(selectedPrice === "Brangiausi"){
    result.sort((a,b)=> parseFloat(a.screenings[0].price.split(' ')[0]) > parseFloat(b.screenings[0].price.split(' ')[0]) ? 1 : -1,)
  }
  
  setArrayToFilter(result);
}, [selectedPrice]);


const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
};

  return (
    <div className={styles.BackGround}>
      <Box className={styles.Box}>
        <TextField
          label="Paieška"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          id='search'
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
            className={styles.SortSelect}
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
        <FormControl className={styles.Filter} >
          <InputLabel id="demo-simple-select-label">Miestas</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCity}
            label="Miestas"
            onChange={handleCityChange}
          >
            <MenuItem value="Visi">Visi</MenuItem>
            <MenuItem value="Kaunas">Kaunas</MenuItem>
            <MenuItem value="Vilnius">Vilnius</MenuItem>
            <MenuItem value="Klaipėda">Klaipėda</MenuItem>
            <MenuItem value="Šiauliai">Šiauliai</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="subtitle1" color="text.secondary" className={styles.FilterText}>
          <b>Rūšiuoti: </b>
        </Typography>
        <FormControl className={styles.Filter} >
          <InputLabel id="demo-simple-select-label">Laikas</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedTime}
            label="Laikas"
            className={styles.SortSelect}
            onChange={handleTimeChange}
          >
            <MenuItem value="Artimiausi">Artimiausi</MenuItem>
            <MenuItem value="Tolimiausi">Tolimiausi</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={styles.Filter} >
          <InputLabel id="demo-simple-select-label">Kaina</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedPrice}
            label="Kaina"
            onChange={handlePriceChange}
          >
            <MenuItem value="Pigiausi">Pigiausi</MenuItem>
            <MenuItem value="Brangiausi">Brangiausi</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {movies.length === 0 ?  <div className={styles.InnerBackGround} ><button className="btn btn-light text-dark btn-lg w-40"> Nėra filmų </button></div>
        :
        arrayToFilter.map((movie) => (
          <Card className={styles.Card}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <CardMedia
                className={styles.Photo} 
                image={movie.img}
              />
              <CardContent sx={{ flex: '1 0 auto' }}>
              <Link to={`/screenings/${id}/${movie.id}`} className={styles.Link}>
                <Typography component="div" variant="h3" className={styles.MovieTitle}>
                {movie.title}
                </Typography>
              </Link>
              <Typography variant="subtitle1" color="text.secondary" className={styles.MovieGenre}>
                  {movie.titleEng}
                </Typography>
              <Typography variant="subtitle1" color="text.secondary" className={styles.MovieGenre}>
                <b>Žanras: </b>{movie.genre}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" className={styles.MovieGenre}>
              <b>Trukmė: </b>{movie.duration}
              </Typography>

              <Box className={styles.GenreRow}>
                <Typography variant="subtitle1" color="text.secondary" className={styles.MovieGenre}>
                {movie.cinema.name}
                </Typography>

                {movie.trailerURL && (
                    <Button
                    sx={{
                      fontWeight: 'bold',
                      border: '5px solid #6d8e9c',
                      borderRadius: '5px',
                      color: 'black',
                      marginRight: '45px',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                      },
                    }}
                    onClick={() => toggleTrailer(movie.id)}
                    startIcon={<PlayArrowRoundedIcon sx={{ color: 'black' }} />}
                    >
                      Žiūrėti anonsą
                    </Button>
                  )}
              </Box>
              

              </CardContent>
              <CardActions>
              {(role === 'admin') && (
                <>
                  <IconButton >
                    <MovieEditButton linkstate={{id, movie}} url={'/edit_movie'}/>
                  </IconButton>
                  <IconButton >
                    <MovieDeleteButton url={deleteUrl + movie.id}  onDelete={onDelete}/>
                  </IconButton>
                </>
              )}
              </CardActions>
            </Box>
            {showTrailer[movie.id] && (
                <Box className={styles.TrailerOverlay}>
                  <Box className={styles.YoutubeCard}>
                    <button className={styles.CloseButton} onClick={() => toggleTrailer(movie.id)}>✖</button>
                    <iframe
                      width="1120"
                      height="630"
                      src={movie.trailerURL.replace("watch?v=", "embed/")}
                      title={`${movie.title} trailer`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </Box>
                </Box>
              )}
          </Card>
        ))
      }
    </div>
  );
}

export default withLoading(AllMoviesList);