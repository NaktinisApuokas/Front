import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import withLoading from '../HOCs/withLoading';
import MovieCard from './MovieCard'; // Create a MovieCard component
import styles from './MovieList.module.css';
import { Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { AuthContext } from '../App';

function MoviesList({ movies, url, id }) {
  const [selectedCategory, setSelectedCategory] = useState("Visi");
  const [arrayToFilter, setArrayToFilter] = useState(movies);
  const [selectedTime, setSelectedTime] = useState();
  const [selectedPrice, setSelectedPrice] = useState();
  const { role } = useContext(AuthContext);
  const deleteUrl = `${url}/`;

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleTimeChange(event) {
    setSelectedTime(event.target.value);
  }

  function handlePriceChange(event) {
    setSelectedPrice(event.target.value);
  }

  useEffect(() => {
    let result = movies;
    result = filterGenre(result);
    setArrayToFilter(result);
  }, [selectedCategory]);

  function filterGenre(array) {
    if (!selectedCategory || selectedCategory === "Visi") {
      return array;
    }
    return array.filter((movie) => movie.genre.toLowerCase().includes(selectedCategory.toLowerCase()));
  }

  useEffect(() => {
    let result = arrayToFilter;

    if (selectedTime === "Artimiausi") {
      result.sort((a, b) => a.screenings[0].time > b.screenings[0].time ? -1 : 1);
    }
    if (selectedTime === "Tolimiausi") {
      result.sort((a, b) => a.screenings[0].time > b.screenings[0].time ? 1 : -1);
    }

    setArrayToFilter(result);
  }, [arrayToFilter, selectedTime]);

  useEffect(() => {
    let result = arrayToFilter;
    if (selectedPrice === "Pigiausi") {
      result.sort((a, b) => parseFloat(a.screenings[0].price.split(' ')[0]) > parseFloat(b.screenings[0].price.split(' ')[0]) ? -1 : 1);
    }
    if (selectedPrice === "Brangiausi") {
      result.sort((a, b) => parseFloat(a.screenings[0].price.split(' ')[0]) > parseFloat(b.screenings[0].price.split(' ')[0]) ? 1 : -1);
    }

    setArrayToFilter(result);
  }, [arrayToFilter, selectedPrice]);

  return (
    <div className={styles.BackGround}>
      {(role === 'admin') && (
        <Box className={styles.AddButton}>
          <Link to="/add_movie" state={{ type: id }}><button className="btn btn-light text-dark btn-lg w-40"> Add Movie </button></Link>
        </Box>
      )}
      <Box className={styles.Box}>
        <Typography variant="subtitle1" color="text.secondary" className={styles.FilterText}>
          <b>Filtruoti: </b>
        </Typography>
        <FormControl className={styles.Filter} >
          <InputLabel id="demo-simple-select-label">Žandras</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCategory}
            label="Žandras"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">Visi</MenuItem>
            <MenuItem value="Animacija">Animacija</MenuItem>
            <MenuItem value="Nuotykių">Nuotykių</MenuItem>
            <MenuItem value="Romantinis">Romantinis</MenuItem>
            <MenuItem value="Drama">Drama</MenuItem>
            <MenuItem value="Komedija">Komedija</MenuItem>
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
      {movies.length === 0 ? <div className={styles.InnerBackGround} ><button className="btn btn-light text-dark btn-lg w-40"> Nėra filmų </button></div>
        :
        arrayToFilter.map((movie) => (
          <MovieCard key={movie.id} movie={movie} role={role} deleteUrl={deleteUrl} />
        ))
      }
    </div>
  );
}

export default withLoading(MoviesList);
