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
  CardActions } from '@mui/material';
import MovieEditButton from './MovieEditButton';
import MovieDeleteButton from './MovieDeleteButton';
import { AuthContext } from '../App';

function AllMoviesList({movies, url, deleteUrl, id, onDelete}) {
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedPrice, setSelectedPrice] = useState();
  const [arrayToFilter, setArrayToFilter] = useState(movies);
  const { role } = useContext(AuthContext);

  function CalculateTimeLeft(time) {
    var both  = time.split(':');
    var hours = both[0];
    var minutes = both[1];
    let today = new Date();
    var lefth = hours - today.getHours();
    var leftmin = minutes - today.getMinutes();
    if(leftmin < 0){
      leftmin = leftmin + 60;
      lefth--;
    }
    if(lefth < 0){
      lefth = "0";
    }
    if(lefth < 10){
      lefth = '0' + lefth;
    }
    
    if(leftmin < 10){
      leftmin = '0' + leftmin;
    }
    return(`${lefth}:${leftmin}`);
  }

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
    setArrayToFilter(result);
}, [selectedCategory, selectedCity]);

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

  return (
    <div className={styles.BackGround}>
      {(role === 'admin') && (
      <Box className={styles.AddButton}>
        <Link to="/add_movie" state={{ type: id }}><button className="btn btn-light text-dark btn-lg w-40"> Pridėti filmą </button></Link>
      </Box>
      )}
      <Box className={styles.Box}>
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
              <Link className={styles.Link} key={movie.id} to="/screenings" state={{ type: id, movieid: movie.id }}>
                <Typography component="div" variant="h3" className={styles.MovieTitle}>
                {movie.title}
                </Typography>
              </Link>
              <Typography variant="subtitle1" color="text.secondary" className={styles.MovieGenre}>
                <b>Žanras: </b>{movie.genre}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" className={styles.MovieGenre}>
              <b>Trukmė: </b>{movie.duration}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" className={styles.MovieGenre}>
              {movie.cinema.name}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                {/* {movie.screenings.map((screening) => (
                  <Typography variant="h5" className={styles.MovieGenre}>
                  {screening.time}
                  </Typography>
                ))} */}
              </Box>
              </CardContent>
              <Box>
                {/* <Typography variant="h2" className={styles.TimeLeft}>
                  Liko laiko: {CalculateTimeLeft(movie.screenings[0].time)}
                </Typography> */}
                {/* <Typography variant="h4" className={styles.MovieGenre} >
                  Laisvos vietos: {movie.screenings[0].emptyseatnumber}
                </Typography>
                <Typography variant="h6" className={styles.MovieGenre} >
                  Kaina: {movie.screenings[0].price}
                </Typography> */}
              </Box>
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
          </Card>
        ))
      }
    </div>
  );
}

export default withLoading(AllMoviesList);